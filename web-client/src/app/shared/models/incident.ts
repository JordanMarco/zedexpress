export interface IIncident {
  id: number;
  titre?: string;
  statut?: string;
  message?: number;
  motif?: string;
  client_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export class Incidents implements IIncident {
  constructor(
      public id: number,
      public client_id: number,
      public titre?: string,
      public statut?: string,
      public message?: number,
      public motif?: string
  ) {}
}
