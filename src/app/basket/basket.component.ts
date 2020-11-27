import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MerchantApiService } from 'src/api/merchantApi/merchant-api.service';
import { IBasketItem } from './basket-item';
import { IBasketItemResponse } from './basket-response';

@Component({
  selector: 'pm-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private _merchantApiService : MerchantApiService, private _router: Router){
        
  }

  clickedProductId: string;

  pageTitle: string = 'Basket items';
  errorMessage:string;
  basketItemResponse: IBasketItemResponse;


  ngOnInit(): void {
      var cos = '';
      this._merchantApiService.getBasket().subscribe({
          next: response => {
              this.basketItemResponse = response.data;
          },
          error: err => this.errorMessage = err
      });
  }

  onAnchorClicked(basketItemId: string): void{
      console.log('Anchor clicked' + basketItemId);

      this._merchantApiService.removeFromBasket(basketItemId).subscribe({
        next: response => {
            var cos = '';
            this.ngOnInit();
        },
        error: err => this.errorMessage = err
      })

      console.log(this.clickedProductId);
  }

  onBasketCheckoutClicked(): void {
    console.log('Checkout');

    this._merchantApiService.checkoutBasket().subscribe({
      next: response => {
          var cos = '';
          this._router.navigate(['welcome']);
      },
      error: err => this.errorMessage = err
    })
  }

}
