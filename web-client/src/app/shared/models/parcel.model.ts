export interface Parcel {
    id?: number;
    name: string;
    client: string;
    recipient: string;
    weight: number;
    width: number;
    height: number;
    length: number;
    quantity: number;
    description: string;
    fragility: 'Fragile' | 'Normal';
    category: string;
    price: number;
    agency: string;
    entryDate: Date;
    departureDate: Date;
    expectedArrivalDate: Date;
    status: 'PENDING' | 'SENT' | 'RETRIEVED';
  }
  
  export interface ParcelListResponse {
    parcels: Parcel[];
    total: number;
  }
  
  export interface ParcelListParams {
    page: number;
    pageSize: number;
    search?: string;
  }