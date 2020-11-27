import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './account/register.component';
import { LoginComponent } from './account/login.component';
import { AddProductComponent } from './products/add-product.component';
import { BasketComponent } from './basket/basket.component';
import { JwtInterceptor } from '../api/merchantApi/jwt-interceptor';
import { OrderComponent } from './order/order.component';
import { MyOrderComponent } from './my-order/my-order.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    AddProductComponent,
    BasketComponent,
    OrderComponent,
    MyOrderComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent},
      { path: 'welcome', component: WelcomeComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'login', component: LoginComponent},
      { path: 'addproduct', component: AddProductComponent},
      { path: 'basket', component: BasketComponent},
      { path: 'orders', component: OrderComponent},
      { path: 'myorders', component: MyOrderComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
      //{ path: '**', component: PageNotFoundComponent},
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
