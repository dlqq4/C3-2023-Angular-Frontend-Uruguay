import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TransferModel } from 'src/app/i-model/i-transfer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private apiServeUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }


  public newTransfer(transferencia : TransferModel ): Observable<TransferModel> {
    return this.http.post<TransferModel>(this.apiServeUrl +"/transfer/createtransfer", transferencia);
  }


}
