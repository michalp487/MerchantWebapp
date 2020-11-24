import { Component } from '@angular/core';
import { User } from '../api/merchantApi/user';
import { MerchantApiService } from '../api/merchantApi/merchant-api.service';
import { Role } from '../api/merchantApi/role';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Merchant WebApp';
  version: number = 6;
  user: User;

  constructor(private _merchantApiService: MerchantApiService) {
    this._merchantApiService.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get isCustomer() {
    return this.user && this.user.role === Role.Customer;
  }

  get isAuthenticated() {
    return this.user && this.user.token;
  }

  logout() {
    this._merchantApiService.logout();
  }
}
