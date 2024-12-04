import { IColis } from "./colis";
import { IUser } from "./User";

export interface IIncident {
  id: number;
  titre?: string;
  statut?: string;
  message?: number;
  motif?: string;
  user_id: number;
  user?: IUser;
  colis?: IColis;
  created_at?: Date;
  updated_at?: Date;
}

export class Incidents implements IIncident {
  constructor(
      public id: number,
      public user_id: number,
      public titre?: string,
      public statut?: string,
      public message?: number,
      public motif?: string
  ) {}
}
