import { Component, Input, OnInit } from '@angular/core';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pm-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: [
        './add-product.component.css'
    ]
})
export class AddProductComponent {

    constructor(private _merchantApiService : MerchantApiService, private _router: Router){
        
    }

    pageTitle: string = 'Register';
    productNameInput: string;
    priceInput: number;
    errorMessage: string;

    onAddProductClicked(): void{
        console.log('Anchor clicked ' + this.productNameInput + ' ' + this.priceInput);

        this._merchantApiService.addProduct(this.productNameInput, this.priceInput).subscribe({
            next: response => {
                console.log('Product added.');
                this._router.navigate(['/products']);
            },
            error: err => this.errorMessage = err
        });
    }
}