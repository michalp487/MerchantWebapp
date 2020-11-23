import { Injectable } from '@angular/core';
import { IProduct } from '../../app/products/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from './api-response';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MerchantApiService {

    apiBaseUrl: string = 'https://mptestmerchantwebapi.azurewebsites.net/';

    constructor(private _httpClient: HttpClient){

    }

    getProducts(): Observable<ApiResponse<IProduct[]>> {
        var response = this._httpClient.get<ApiResponse<IProduct[]>>(this.apiBaseUrl + 'product/all').pipe(
            tap(data => console.log('Receive JSON: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
        
        return response;
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';

        if (err.error instanceof ErrorEvent)
        {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else{
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message} `
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }
}