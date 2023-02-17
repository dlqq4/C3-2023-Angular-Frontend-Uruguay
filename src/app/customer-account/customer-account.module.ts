import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountsComponent } from './my-accounts/my-accounts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CustomerAccountRoutingModule } from './customer-account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [  //TODAS ESTAS DECLARACIONES INDICAN QUE ESTOS COMPONENTES SON PARTE DE CUSTOMER-ACCOUNT.MODULE
    MyAccountsComponent,
    UserProfileComponent,
    NewAccountComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule, //SIRVE PARA DIRECTIVAS DE ngIf ngFor y Pipes
    CustomerAccountRoutingModule, //RUTAS PERESOSAS
    FormsModule,
    ReactiveFormsModule,
    RouterModule, 
  ]
})
export class CustomerAccountModule { }
