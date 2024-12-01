export interface ITarif {
  id?: number;
  montant: number;
  libelle: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Tarif implements ITarif {
  constructor(
      public montant: number,
      public libelle: string,
  ) {}
}
