import { CustomerModel } from "./i-customer";

export interface AccountModel {
    id: string;
    customerId: CustomerModel;
    accountTypeId: AccountTypeModel;
    balance: number;
    state: boolean;
  }
  
  export interface AccountTypeModel {
    id: string;
    name: string;
    state: boolean;
  }