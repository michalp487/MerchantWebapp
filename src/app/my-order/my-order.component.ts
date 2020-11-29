import { Component, OnInit } from '@angular/core';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';
import { IOrder } from '../order/order';

@Component({
  selector: 'pm-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  constructor(private _merchantApiService: MerchantApiService) { }

  pageTitle: string = 'My Orders';
  errorMessage:string;
  orders: IOrder[];


  ngOnInit(): void {
      this._merchantApiService.getCurrentUserOrders().subscribe({
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
