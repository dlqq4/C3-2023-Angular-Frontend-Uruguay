import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { CustomerModel } from 'src/app/i-model/i-customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiServeUrl = environment.apiBaseUrl; //Api a consumir

  constructor(private http: HttpClient) {}


  public getCustomer(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]> (this.apiServeUrl+"/customer/findall");
  }

  //***************************************************************** */



}
