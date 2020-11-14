import { Component } from '@angular/core';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: [
        './product-list.component.css'
    ]
})
export class ProductListComponent {
    pageTitle: string = 'Products List';
    products: any[] = [
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
    ];
    filteredProducts: any[] = [
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
    ];
}