import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global-service/service-global.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { SignIn } from 'src/app/i-model/i-signIn';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { JWTCustomerModel } from 'src/app/i-model/i-jwt-customer';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
 
})
export class SinginComponent {


  constructor(public globalService :GlobalService,
              private formBuilder : FormBuilder,
              public loginService:LoginService,
              public routes : Router) {}

  helper = new JwtHelperService();
  response! : string;

  ngOnInit(): void {
  
  }


  signInForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl ('', Validators.required)
  });

  /*
  signInForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl ('', Validators.required)
  });
  */

  postSignIn(){

    if(this.signInForm.controls.username.value && this.signInForm.controls.password.value){
        let form: SignIn = {
          username: this.signInForm.controls.username.value,
          password: this.signInForm.controls.password.value 
        }
      
          this.loginService.login(form).subscribe({
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


  /*
  OnSubmit(){
    this.loginService.registerGoogle(this.signInForm.value)
    .then(response =>{console.log(response)}) //LA RESPUESTA QUE ME ENVIA FIREBASE, ACA VA LA REDIRECCION QUE INDICO
    .catch(error => console.log('Algo salio mal papá!'));

  }
  */

}
