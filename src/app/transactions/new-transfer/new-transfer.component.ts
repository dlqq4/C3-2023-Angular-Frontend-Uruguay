import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent {


  constructor(private formBuilder: FormBuilder,
              private route : Router,
              public transferService: TransferService) {}


              transferForm = this.formBuilder.group({
                outcome: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
                income: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
                amount: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
                reason: this.formBuilder.nonNullable.control('', { validators: [Validators.required] }),
              });

              creatreTransfer() {
                if ( this.transferForm.controls.outcome.value 
                  && this.transferForm.controls.income.value
                  && this.transferForm.controls.amount.value
                  && this.transferForm.controls.reason.value
                  ) {
                  let transferencia = {
                    outcome: this.transferForm.controls.outcome.value ,
                    income: this.transferForm.controls.income.value,
                    amount: + this.transferForm.controls.amount.value, //saque un + antes del this
                    reason: this.transferForm.controls.reason.value,
                  }
                  this.transferService.newTransfer(transferencia).subscribe({ //NEXT ERROR COMPLETE CUANDO LA DATA LLEGA
                    next:data => {console.log(data);
                    this.route.navigate(['customer-account/app-my-accounts']);
                    },
                    complete: ()=> alert("¡Transferencia exitosa!")
                  })
                }
              }         
    
}
