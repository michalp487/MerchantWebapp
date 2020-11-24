import { Component, OnInit } from '@angular/core';
import { MerchantApiService } from 'src/api/merchantApi/merchant-api.service';
import { IProduct } from '../products/product';

@Component({
  selector: 'pm-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private _merchantApiService : MerchantApiService){
        
  }

  clickedProductId: string;

  pageTitle: string = 'Products List';
  errorMessage:string;
  products: IProduct[];
  filteredProducts: IProduct[];


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

  onAnchorClicked(message: string): void{
      console.log('Anchor clicked' + message);
      console.log(this.clickedProductId);
  }

}
