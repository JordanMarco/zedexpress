export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    confirmPassword?: string;
    nationalId: string;
    address: string;
    phone: string;
    email: string;
    country: string;
    accountType: 'Administrator' | 'Agent' | 'Client';
  }
  
  export interface UserListResponse {
    users: User[];
    total: number;
  }
  
  export interface UserListParams {
    page: number;
    pageSize: number;
    search?: string;
  }