import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService {
  private readonly baseUrl: string = `${environment.basePath}/api/account-type`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des types de comptes avec ou sans pagination.
   * @param withPaginate Indique si la pagination doit être activée.
   * @returns Observable avec la liste des types de comptes.
   */
  index(page?:number, withPaginate: boolean = true): Observable<any> {
    let params = new HttpParams();
    if(page) params.set('page', page);
    params = params.set('with_paginate', withPaginate);

    return this.http.get<any>(this.baseUrl, { params });
  }

  /**
   * Crée un nouveau type de compte.
   * @param data Les données du type de compte à créer.
   * @returns Observable avec les informations du type de compte créé.
   */
  store(accountType: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, accountType);
  }

  /**
   * Met à jour un type de compte existant.
   * @param id L'identifiant du type de compte à mettre à jour.
   * @param data Les nouvelles données du type de compte.
   * @returns Observable avec les informations du type de compte mis à jour.
   */
  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Supprime un type de compte.
   * @param id L'identifiant du type de compte à supprimer.
   * @returns Observable avec le résultat de l'opération.
   */
  destroy(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
