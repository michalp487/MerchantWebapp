import { Component, Input, OnInit } from '@angular/core';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';

@Component({
    selector: 'pm-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: [
        './add-product.component.css'
    ]
})
export class AddProductComponent {

    constructor(private _merchantApiService : MerchantApiService){
        
    }

    pageTitle: string = 'Register';
    productNameInput: string;
    priceInput: string;

    onAddProductClicked(): void{
        console.log('Anchor clicked ' + this.productNameInput + ' ' + this.priceInput);
    }
}