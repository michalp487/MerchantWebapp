import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from './product';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';
import { User } from '../../api/merchantApi/user';
import { Role } from 'src/api/merchantApi/role';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: [
        './product-list.component.css'
    ]
})
export class ProductListComponent implements OnInit {

    constructor(private _merchantApiService : MerchantApiService){
        this._merchantApiService.user.subscribe(x => this.user = x);
    }

    pageTitle: string = 'Products List';
    errorMessage:string;
    products: IProduct[];
    filteredProducts: IProduct[];
    user: User;

    ngOnInit(): void {
        var cos = '';
        this._merchantApiService.getProducts().subscribe({
            next: response => {
                this.products = response.data;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }

    onAnchorClicked(productId: string): void{
        console.log('Anchor clicked' + productId);
        this._merchantApiService.addToBasket(productId).subscribe({
            next: response => {
                var cos = '';
            },
            error: err => this.errorMessage = err
        })
        console.log(productId);
    }

    get isCustomer() {
        return this.user && this.user.role === Role.Customer;
      }
}