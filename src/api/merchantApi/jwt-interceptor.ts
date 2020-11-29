import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MerchantApiService } from './merchant-api.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _merchantApiService: MerchantApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = this._merchantApiService.userValue;
        const isLoggedIn = user && user.token;

        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}