import { PaymentStatusEnum } from "../enums/enums";

export interface IPayment {
  id: number;
  uuid: string;
  amount: number;
  status: PaymentStatusEnum;
  colis_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

