import { Injectable } from '@angular/core';
import { IProduct } from '../../app/products/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from './api-response';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from './user';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { IBasketItemResponse } from '../../app/basket/basket-response';

@Injectable({
    providedIn: 'root'
})
export class MerchantApiService {

    apiBaseUrl: string = 'https://mptestmerchantwebapi.azurewebsites.net/';

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private _httpClient: HttpClient, private _router: Router){
        // Move to ngInit?
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    register(username: string, password: string): Observable<ApiResponse<string>> {
        var cos = '';
        var response = this._httpClient.post<ApiResponse<string>>(this.apiBaseUrl + 'account/register', { username, password })
            .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('user', JSON.stringify(user));
                //this.userSubject.next(user);

                this.login(username, password).subscribe({
                    next: response => {
                        console.log('Logged in.')
                    },
                    error: err => {

                    }
                });
                
                return response;
            }),
            catchError(this.handleError)
            );
        
        return response;
    }

    login(username: string, password: string): Observable<ApiResponse<string>> {
        var cos = '';
        var response = this._httpClient.post<ApiResponse<string>>(this.apiBaseUrl + 'account/login', { username, password })
            .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('user', JSON.stringify(user));
                // this.userSubject.next(user);

                var tokenDecoded = jwt_decode(response.data);

                var user = new User();
                user.id = tokenDecoded["nameid"];
                user.role = tokenDecoded["role"];
                user.token = response.data;
                user.username = username;

                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);

                return response;
            }),
            catchError(this.handleError)
            );

        return response;
    }

    logout() {
        // remove user from local storage to log user out
        this._httpClient.post(this.apiBaseUrl + 'account/logout', {}).subscribe();

        localStorage.removeItem('user');
        this.userSubject.next(null);

        this._router.navigate(['/login']);
    }

    getProducts(): Observable<ApiResponse<IProduct[]>> {
        var response = this._httpClient.get<ApiResponse<IProduct[]>>(this.apiBaseUrl + 'product/all').pipe(
            tap(data => console.log('Receive JSON: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
        
        return response;
    }

    addProduct(name: string, price: number): Observable<ApiResponse<string>> {
        var cos = '';
        var response = this._httpClient.post<ApiResponse<string>>(this.apiBaseUrl + 'product', { name, price })
            .pipe(map(response => {
                console.log('Product added.');
                return response;
            }),
            catchError(this.handleError)
            );
        
        return response;
    }

    removeProduct(productId: string): Observable<ApiResponse<string>> {
        var cos = '';
        var response = this._httpClient.delete<ApiResponse<string>>(this.apiBaseUrl + 'product?productId=' + productId)
            .pipe(map(response => {
                console.log('Product removed.');
                return response;
            }),
            catchError(this.handleError)
            );
        
        return response;
    }

    addToBasket(productId: string): Observable<ApiResponse<string>> {
        var cos = '';
        var response = this._httpClient.post<ApiResponse<string>>(this.apiBaseUrl + 'basket', { productId })
            .pipe(map(response => {
                console.log('Product added to basket.');
                return response;
            }),
            catchError(this.handleError)
            );
        
        return response;
    }

    removeFromBasket(basketItemId: string): Observable<ApiResponse<string>> {
        var cos = '';
        var response = this._httpClient.delete<ApiResponse<string>>(this.apiBaseUrl + 'basket?basketItemId=' + basketItemId)
            .pipe(map(response => {
                console.log('Basket item removed.');
                return response;
            }),
            catchError(this.handleError)
            );
        
        return response;
    }

    getBasket(): Observable<ApiResponse<IBasketItemResponse>> {
        var response = this._httpClient.get<ApiResponse<IBasketItemResponse>>(this.apiBaseUrl + 'basket').pipe(
            tap(data => console.log('Receive JSON basket: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
        
        return response;
    }

    checkoutBasket(): Observable<ApiResponse<boolean>> {
        var response = this._httpClient.post<ApiResponse<boolean>>(this.apiBaseUrl + 'basket/checkout', {}).pipe(
            tap(data => console.log('Receive JSON basket: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
        
        return response;
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';

        if (err.error instanceof ErrorEvent)
        {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else{
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message} `
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }
}