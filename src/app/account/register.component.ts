import { Component, Input, OnInit } from '@angular/core';
import { MerchantApiService } from '../../api/merchantApi/merchant-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pm-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.css'
    ]
})
export class RegisterComponent {

    constructor(private _merchantApiService : MerchantApiService, private _router: Router){
        
    }

    pageTitle: string = 'Register';
    emailInput: string;
    passwordInput: string;
    errorMessage: string;

    onRegisterClicked(): void{
        console.log('Anchor clicked ' + this.emailInput + ' ' + this.passwordInput);

        this._merchantApiService.register(this.emailInput, this.passwordInput).subscribe({
            next: response => {
                console.log('User registered.');
                this._router.navigate(['/welcome']);
            },
            error: err => this.errorMessage = err
        });
    }
}