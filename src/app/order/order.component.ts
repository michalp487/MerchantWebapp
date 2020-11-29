import { Component, OnInit } from '@angular/core';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';
import { IOrder } from './order';

@Component({
  selector: 'pm-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private _merchantApiService: MerchantApiService) { }

  pageTitle: string = 'Orders';
  errorMessage:string;
  orders: IOrder[];


  ngOnInit(): void {
      this._merchantApiService.getOrders().subscribe({
          next: response => {
              this.orders = response.data;
          },
          error: err => this.errorMessage = err
      });
  }

  onAnchorClicked(orderId: string): void{
      console.log('Anchor clicked' + orderId);

      alert('Here Ogone integration will begin.');
  }

}