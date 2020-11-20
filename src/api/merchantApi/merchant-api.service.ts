import { Injectable } from '@angular/core';
import { IProduct } from '../../app/products/product';

@Injectable({
    providedIn: 'root'
})
export class MerchantApiService {

    getProducts(): IProduct[] {
        return [
            {
                "productId": 1,
                "productName": "Garden Toys",
                "price": 29.99
            },
            {
                "productId": 2,
                "productName": "Smartphone",
                "price": 199.99
            },
            {
                "productId": 3,
                "productName": "Laptop",
                "price": 3000.0
            }
        ]
    }

}