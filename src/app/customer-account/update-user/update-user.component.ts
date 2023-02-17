import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global-service/service-global.service';
import { CustomerService } from '../services/customer.service';
import { LoginService } from 'src/app/login/services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { JWTCustomerModel } from 'src/app/i-model/i-jwt-customer';
import { SignUpModel } from 'src/app/i-model/i-signUp';
import { CustomerUpdateModel } from 'src/app/i-model/i-customer-update';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {


  constructor  (public globalService: GlobalService,
                public customerService :CustomerService,
                public loginService : LoginService,
                private formBuilder : FormBuilder,
     ) {}


  ngDoCheck(){
    this.UpdateForm;
  }
    
  UpdateForm = this.formBuilder.group({
    fullName: this.customerService.customer.fullName,
    document: this.customerService.customer.document,
    phone: this.customerService.customer.phone,
    email: this.customerService.customer.email,
    password: this.customerService.customer.password,
  });

  postUpdate() {
    if (this.UpdateForm.controls.document.value
      && this.UpdateForm.controls.fullName.value
      && this.UpdateForm.controls.email.value
      && this.UpdateForm.controls.phone.value
      && this.UpdateForm.controls.password.value
      ) {

      const dataRegister: CustomerUpdateModel = {

        fullName: this.UpdateForm.controls["fullName"].value,
        document: this.UpdateForm.controls["document"].value,
        phone: this.UpdateForm.controls["phone"].value.toString(),
        email: this.UpdateForm.controls["email"].value,
        password: this.UpdateForm.controls["password"].value,
      
      }
      this.customerService.postUpdateCustomer(this.customerService.customer.id, dataRegister).subscribe(data => {
        console.log(data);
        this.globalService.valorCaseUser = 1
        });
    }
  }







}
