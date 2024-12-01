export interface Incident {
  id?: number;
  title: string;
  parcelId: number;
  parcelName: string;
  clientName: string;
  reason: string;
  status: 'PENDING' | 'RESOLVED';
  createdAt: Date;
}

export interface IncidentListResponse {
  incidents: Incident[];
  total: number;
}

export interface IncidentListParams {
  page: number;
  pageSize: number;
  search?: string;
}