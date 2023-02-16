export interface CustomerModel {
  id: string;
  documentType: DocumentTypeModel;
  document: string;
  fullName: string;
  email: string;
  phone: number;
  password: string;
  avatarUrl?: string;
  state: boolean;
  daletedAt?: Date | number;
}
  
export interface DocumentTypeModel {
  id: string;
  name: string;
  state: boolean;
}