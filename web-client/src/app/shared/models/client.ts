export interface IClient {
  id: number;
  cni?: string;
  phone?: string;
  gender?: string;
  address?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Client implements IClient {
  constructor(
      public id: number,
      public cni?: string,
      public phone?: string,
      public gender?: string,
      public address?: string,
      public first_name?: string,
      public last_name?: string,
      public email?: string
  ) {}
}
