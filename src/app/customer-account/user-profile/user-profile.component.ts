import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global-service/service-global.service';
import { CustomerModel } from 'src/app/i-model/i-customer';
import { CustomerService } from '../services/customer.service';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [GlobalService]
})
export class UserProfileComponent implements OnInit{



  public customers : CustomerModel[] = [];


  constructor  (public globalService: GlobalService,
                public customerService :CustomerService,
                public loginService : LoginService) {}


  ngOnInit(): void {
    this.customerService.getCustomer()
  }

  ngDoCheck(){
    this.globalService.eligeViewUser()
  }


  //TRAE TODOS LOS CUSTOMERS
  public getAllCustomer(): void {
    this.customerService.getAllCustomers().subscribe({
    next: (response: CustomerModel[] ) =>{console.log(this.customers = response)},
    error: (error:HttpErrorResponse)=> {alert(error.message)}
    })
  }
 
}
