import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerModel } from 'src/app/i-model/i-customer';
import { LoginService } from 'src/app/login/services/login.service';
import { CustomerUpdateModel } from 'src/app/i-model/i-customer-update';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiServeUrl = environment.apiBaseUrl; //Api a consumir

  public user : Object = {};
  customer : CustomerModel = <CustomerModel> this.user;

  constructor(private http: HttpClient,
              private loginService: LoginService,
    ) {}


  public getAllCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]> (this.apiServeUrl+"/customer/findall");
  }

  public getcustomerById(id : string): Observable<CustomerModel> {
    return this.http.get<CustomerModel> (this.apiServeUrl+"/customer/find/"+id)
  }

    //TRAE UN CUSTOMER SEGUN ID
    public getCustomer(): void {
      this.getcustomerById(this.loginService.userId).subscribe({
      next: (response: CustomerModel ) =>{console.log(this.customer = response)},
      error: (error:HttpErrorResponse)=> {alert(error.message)}
      })
    }

    public postUpdateCustomer(id: string, customer: CustomerUpdateModel): Observable<CustomerUpdateModel> {
      return this.http.put<CustomerUpdateModel>(this.apiServeUrl+"/customer/update/"+id, customer)
    }

  //***************************************************************** */



}
