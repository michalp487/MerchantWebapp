import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MerchantApiService } from './merchant-api.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _merchantApiService: MerchantApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this._merchantApiService.userValue;
        const isLoggedIn = user && user.token;
        //const isApiUrl = request.url.startsWith(environment.apiUrl);
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