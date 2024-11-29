import { ColisStatusEnum } from "../enums/enums";

export interface IColis {
  id: number;
  nom?: string;
  hour?: string;
  hours?: string;
  statut: ColisStatusEnum;
  nature?: string;
  country?: string;
  fragilite?: string;
  date_entre?: Date;
  contenance?: string;
  date_arrivee?: Date;
  who?: number;
  poids?: number;
  date_depart?: Date;
  date_arrive?: Date;
  hauteur?: number;
  largeur?: number;
  longueur?: number;
  quantite?: number;
  valeur_euro?: number;
  receiver_id: number;
  user_id: number;
  tarif_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class Colis implements IColis {
  constructor(
    public id: number,
    public statut: ColisStatusEnum,
    public receiver_id: number,
    public tarif_id: number,
    public user_id: number,
    public nom?: string,
    public hour?: string,
    public hours?: string,
    public nature?: string,
    public country?: string,
    public fragilite?: string,
    public date_entre?: Date,
    public contenance?: string,
    public date_arrivee?: Date,
    public who?: number,
    public poids?: number,
    public date_depart?: Date,
    public date_arrive?: Date,
    public hauteur?: number,
    public largeur?: number,
    public longueur?: number,
    public quantite?: number,
    public valeur_euro?: number
  ) { }
}
