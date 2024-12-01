import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITarif, Tarif } from '../models/tarif';

@Injectable({
  providedIn: 'root',
})
export class TarifService {
  private readonly baseUrl: string = `${environment.basePath}/api/tarif`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des tarifs avec ou sans pagination.
   * @param withPaginate Indique si la pagination doit être activée.
   * @returns Observable avec la liste des tarifs.
   */
  index(page: number = 1, size: number = 10, search: string = '', withPaginate: boolean = true): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('per_page', size);
    params = params.set('search', search);
    params = params.set('with_paginate', withPaginate);

    return this.http.get<any>(this.baseUrl, { params });
  }

  /**
   * Crée un nouveau tarif.
   * @param Tarif Les données du tarif à créer.
   * @returns Observable avec les informations du tarif créé.
   */
  store(tarif: Tarif): Observable<ITarif> {
    return this.http.post<ITarif>(this.baseUrl, tarif);
  }

  /**
   * Met à jour un tarif existant.
   * @param id L'identifiant du tarif à mettre à jour.
   * @param tarif Les nouvelles données du tarif.
   * @returns Observable avec les informations du tarif mis à jour.
   */
  update(id: number, tarif: Tarif): Observable<ITarif> {
    return this.http.put<ITarif>(`${this.baseUrl}/${id}`, tarif);
  }

  /**
   * Supprime un tarif.
   * @param id L'identifiant du tarif à supprimer.
   * @returns Observable avec le résultat de l'opération.
   */
  destroy(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
