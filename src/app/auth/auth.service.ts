import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";

import {environment} from '../../environments/environment';
import {AUTH_API_URL, AUTH_SIGN_IN_PATH, AUTH_SIGN_UP_PATH} from '../shared/config';
import {UserModel} from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new BehaviorSubject<UserModel | null>(null);
  private tokenExpirationTimer: any = null;
  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      `${AUTH_API_URL}/${AUTH_SIGN_UP_PATH}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      {
        params: new HttpParams()
          .set('key', environment.firebaseApiKey),
      },
    ).pipe(
      catchError(this.handleError),
      tap((res) => {
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
      }),
    );
  }

  signIn(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      `${AUTH_API_URL}/${AUTH_SIGN_IN_PATH}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      {
        params: new HttpParams()
          .set('key', environment.firebaseApiKey),
      },
    ).pipe(
      catchError(this.handleError),
      tap((res) => {
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
      }),
    );
  }

  signOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoSignIn() {
    const userDataStr = localStorage.getItem('userData');

    if (!userDataStr) {
      return;
    }

    const {
      email,
      id,
      _token,
      _tokenExpirationDate,
    } = JSON.parse(userDataStr);
    const tokenExpirationDate = new Date(_tokenExpirationDate);
    const loadedUser = new UserModel(email, id, _token, tokenExpirationDate);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const tokenExpiresIn = tokenExpirationDate.getTime() - Date.now();
      this.autoSignOut(tokenExpiresIn);
    }
  }

  autoSignOut(tokenExpiresIn: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, tokenExpiresIn);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(Date.now() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoSignOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    let errorCode = errorRes?.error?.error?.message;

    switch (errorCode) {
      case 'EMAIL_EXISTS':
        errorMessage = 'A user with this email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User with this email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
      default:
        errorMessage = 'An error occurred';
    }

    return throwError(errorMessage);
  }
}
