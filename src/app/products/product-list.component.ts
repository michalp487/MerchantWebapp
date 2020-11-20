import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: [
        './product-list.component.css'
    ]
})
export class ProductListComponent implements OnInit {

    constructor(private _merchantApiService : MerchantApiService){
        
    }

    pageTitle: string = 'Products List';
    products: IProduct[];
    filteredProducts: IProduct[] = [
        {
            "productId": 2,
            "productName": "Smartphonee",
            "price": 199.99
        },
        {
            "productId": 3,
            "productName": "Laptop",
            "price": 3000.0
        }
    ];

    ngOnInit(): void {
        this.products = this._merchantApiService.getProducts();
        this.filteredProducts = this.products;
    }
}