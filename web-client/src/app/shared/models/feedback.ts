export interface IFeedback {
  id: number;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  state?: number;
  created_at?: Date;
  updated_at?: Date;
}


export class Feedback implements IFeedback {
  constructor(
      public id: number,
      public name?: string,
      public email?: string,
      public subject?: string,
      public message?: string,
      public state?: number
  ) {}
}
