import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthed = false;
  private userSub?: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthed = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  handleFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  handleSaveData() {
    this.dataStorageService.storeRecipes();
  }

  handleLogout() {
    this.authService.signOut();
  }
}
