export interface Title {
  id: number;
  type: string;
  languages: Language[];
}

export interface Language {
  id: number;
  name: string;
  code: string;
  pivot: Pivot;
}

export interface Pivot {
  ressource_id: number;
  language_id: number;
  id: number;
  data: string;
}

export interface Description {
  id: number;
  type: string;
  languages: Language[];
}

export interface Content<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface Bonus {
  bonus: number;
  date_end: Date;
}

export interface Adresse {
  first_name: string;
  last_name: string;
  name?: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
}

export interface Data {}

export interface GenericResponse {
  status_code: number;
}

export interface Currency {
  id: number;
  code: string;
  symbol: string;
  rate: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export class CurrencyStore {
  code: string;
  symbol: string;
  rate: number;

  constructor(code: string, symbol: string, rate: number) {
    this.code = code;
    this.symbol = symbol;
    this.rate = rate;
  }
}

export interface Country {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
  cities: string[];
  code: string;
}

export interface TempDataset {
  axes: any[];
  datas?: any;
  values?: any[];
}
