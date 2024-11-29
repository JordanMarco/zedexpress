import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = `${environment.basePath}/user`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des utilisateurs avec ou sans pagination.
   * @param page page pour la pagination.
   * @param accountId L'identifiant du compte pour filtrer.
   * @param withPaginate Indique si la pagination doit être activée.
   * @returns Observable avec la liste des utilisateurs.
   */
  public index(page?:number, accountId?: number, withPaginate: boolean = true): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if (accountId) {
      params = params.set('account_id', accountId);
    }
    params = params.set('with_paginate', withPaginate);

    return this.http.get<any>(this.baseUrl, { params });
  }

  /**
   * Crée un nouvel utilisateur.
   * @param user User Les données de l'utilisateur à créer.
   * @returns Observable avec les informations de l'utilisateur créé.
   */
  public store(user: User): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user);
  }

  /**
   * Met à jour un utilisateur existant.
   * @param id L'identifiant de l'utilisateur à mettre à jour.
   * @param user Les nouvelles données de l'utilisateur.
   * @returns Observable avec les informations de l'utilisateur mis à jour.
   */
  public update(id: number, user: User): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  /**
   * Supprime un utilisateur.
   * @param id L'identifiant de l'utilisateur à supprimer.
   * @returns Observable avec le résultat de l'opération.
   */
  public destroy(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
