export interface IReturnUser {
  id: string;
  name: string;
  phone_number: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface IReturnUsers {
  users: IReturnUser[];
}

export interface User {
  name: string;
  phone_number: string;
  role: string;
}