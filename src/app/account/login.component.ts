import { Component, Input, OnInit } from '@angular/core';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pm-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ]
})
export class LoginComponent {

    constructor(private _merchantApiService : MerchantApiService, private _router: Router){
        
    }

    pageTitle: string = 'Login';
    emailInput: string;
    passwordInput: string;
    errorMessage: string;

    onLoginClicked(): void{
        console.log('Anchor clicked ' + this.emailInput + ' ' + this.passwordInput);

        this._merchantApiService.login(this.emailInput, this.passwordInput).subscribe({
            next: response => {
                alert('User logged in.');
                this._router.navigate(['/products']);
            },
            error: err => this.errorMessage = err
        });
    }
}