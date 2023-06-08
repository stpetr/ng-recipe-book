import {Component} from "@angular/core";

import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  handleFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  handleSaveData() {
    this.dataStorageService.storeRecipes();
  }
}
