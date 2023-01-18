import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription
  isAuthenticated = false

  constructor(private dataService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onSaveData() {
    this.dataService.storeRecipes()
  }

  onFetchData() {
    this.dataService.fetchRecipes().subscribe()
  }
}
