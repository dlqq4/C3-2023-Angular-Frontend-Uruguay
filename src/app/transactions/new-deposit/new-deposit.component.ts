import { Component } from '@angular/core';
import { DepositsService } from '../services/deposits.service';
import { DepositModel } from 'src/app/i-model/i-deposit';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-deposit',
  templateUrl: './new-deposit.component.html',
  styleUrls: ['./new-deposit.component.scss']
})
export class NewDepositComponent {


  constructor(public  depositsService: DepositsService,
              private formBuilder : FormBuilder){

  }

  depositForm = this.formBuilder.group({
    id: new FormControl('', Validators.required),
    amount: new FormControl ('', Validators.required)
  });

  postDeposit(){
    if(this.depositForm.controls.id.value && this.depositForm.controls.amount.value){
        let form: DepositModel = {
          account: this.depositForm.controls.id.value,
          amount: + this.depositForm.controls.amount.value 
        }
        this.depositsService.addDeposit(form).subscribe({
          next: data => {console.log(data)},
          complete: ()=> alert("¡Depósito exitoso!")

        })
    }
  }



}
