import { IColis } from "./colis";

export interface Dashboard {
  total_user: number;
  total_agent: number;
  total_client: number;
  total_colis: number;
  total_unpaid_colis: number;
  last_colis: IColis[];
}
