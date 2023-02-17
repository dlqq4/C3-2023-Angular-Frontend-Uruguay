import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global-service/service-global.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SignUpModel } from 'src/app/i-model/i-signUp';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerModel } from 'src/app/i-model/i-customer';
import { JWTCustomerModel } from 'src/app/i-model/i-jwt-customer';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent {

  


  helper = new JwtHelperService();

  response! : string;
  
  constructor(public globalService : GlobalService,
              private formBuilder : FormBuilder,
              public loginService : LoginService,
              public routes : Router) {}

  

  signUpForm = this.formBuilder.group({

    fullName: this.formBuilder.nonNullable.control('',{ validators: [Validators.required]}),
    documentTypeName: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    document: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    phone: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    email: this.formBuilder.nonNullable.control('', { validators: [Validators.required, Validators.email] }),
    password: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
    accountTypeName: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
  
  });

  postSignUp() {
    if (this.signUpForm) {

      const dataRegister: SignUpModel = {

        fullName: this.signUpForm.controls["fullName"].value,
        documentTypeName: this.signUpForm.controls["documentTypeName"].value,
        document: this.signUpForm.controls["document"].value,
        phone: this.signUpForm.controls["phone"].value,
        email: this.signUpForm.controls["email"].value,
        password: this.signUpForm.controls["password"].value,
        accountTypeName: this.signUpForm.controls["accountTypeName"].value,
      
      }

      this.loginService.signUp(dataRegister).subscribe({
        next: (data) => {this.response = data},
        complete: () => {
          let token: JWTCustomerModel | null = this.helper.decodeToken<JWTCustomerModel>(this.response);
          localStorage.setItem('Token', this.response);  //data es lo que devuelve mi signup
          if (token){
            this.loginService.userId = token.customer.id;
            this.loginService.activeLogin();
            this.routes.navigate(['/customer-account/app-user-profile'])
          }
          }
        });
    }
  }

  //*********************************SIGNUP GOOGLE*************************************
  
  
  withGoogle(){
    this.loginService.registerGoogle()
    .then(response =>{      
      const dataRegister: SignUpModel = {
        fullName: response.user.displayName!,
        documentTypeName: "",
        document: "",
        phone: "",
        email: response.user.email!,
        password: "",
        accountTypeName: "Caja de Ahorro",
      }
      this.loginService.signUp(dataRegister).subscribe({
        next: (data) => {this.response = data},
        complete: () => {
          let token: JWTCustomerModel | null = this.helper.decodeToken<JWTCustomerModel>(this.response);
          localStorage.setItem('Token', this.response);  //data es lo que devuelve mi signup
          if (token){
            this.loginService.userId = token.customer.id;
            this.loginService.activeLogin();
            this.routes.navigate(['/customer-account/app-user-profile'])
          }
          }
        });
    })
    .catch(error => console.log(error))
  }

  

}
