import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountModel } from 'src/app/i-model/i-account';
import { LoginService } from 'src/app/login/services/login.service';


@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss']
})
export class MyAccountsComponent {

  public i : number = 1

  public accounts : AccountModel[] = [];

  
  public cuenta : Object = {};

  account : AccountModel = <AccountModel> this.cuenta;

  
  
  constructor(public accountService: AccountService,
              public loginService: LoginService) {

  }


  ngOnInit(): void {
    this.getAllAccountByIdUser();
  }


  public getAllAccountByIdUser(): void {
    this.accountService.getAccountById(this.loginService.userId).subscribe({
    next: (response: AccountModel[] ) =>{console.log(this.accounts = response)},
    error: (error:HttpErrorResponse)=> {alert(error.message)},
    complete: ()=> {console.log(this.accounts)}
    })
  }

  



}
