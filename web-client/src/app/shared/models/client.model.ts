export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  confirmPassword?: string;
  nationalId: string;
  phone: string;
  email: string;
  address: string;
  country: string;
}

export interface ClientListResponse {
  clients: Client[];
  total: number;
}

export interface ClientListParams {
  page: number;
  pageSize: number;
  search?: string;
}