export interface IUser {
  id?: number;
  cni?: string | null;
  phone?: string;
  country?: string;
  address?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  language_code?: string;
  account_id: number;
  account?: IAccountType;
  email_verified_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export class User implements IUser {
  constructor(
    public login: string,
    public email: string,
    public account_id: number,
    public password: string,
    public password_confirmation: string,
    public country?: string,
    public language_code?: string,
    public phone?: string,
    public address?: string | null,
    public first_name?: string | null,
    public last_name?: string | null,
    public cni?: string | null
  ){}
}

export class Login {
  login: string;
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}


export interface ILoginResponse {
  token: string;
  user: IUser;
  token_type: string;
}


export interface IAccountType {
    id: number;
    code?: string | null;
    label?: string | null;
    possible?: number | null;
    country?: string | null;
    created_at: Date;
    updated_at: Date;
}
