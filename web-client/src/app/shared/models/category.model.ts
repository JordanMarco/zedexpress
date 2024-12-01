export interface Category {
  id?: number;
  label: string;
  amount: number;
}

export interface CategoryListResponse {
  categories: Category[];
  total: number;
}

export interface CategoryListParams {
  page: number;
  pageSize: number;
  search?: string;
}