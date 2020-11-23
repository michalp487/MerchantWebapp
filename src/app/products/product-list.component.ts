import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    errorMessage:string;
    products: IProduct[];
    filteredProducts: IProduct[];

    ngOnInit(): void {
        this._merchantApiService.getProducts().subscribe({
            next: response => {
                this.products = response.data;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
}