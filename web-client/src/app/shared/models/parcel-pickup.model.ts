export interface ParcelPickup {
    id: number;
    client: string;
    recipient: string;
    name: string;
    entryDate: Date;
    expectedArrivalDate: Date;
    status: 'PENDING' | 'SENT' | 'RETRIEVED';
  }
  
  export interface ParcelPickupResponse {
    parcels: ParcelPickup[];
    total: number;
    pageSize: number;
    currentPage: number;
  }
  
  export interface ParcelPickupParams {
    page: number;
    pageSize: number;
    search?: string;
  }