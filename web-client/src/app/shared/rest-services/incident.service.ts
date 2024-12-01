import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIncident } from '../models/incident';
import { Incident } from '../models/incident.model';

@Injectable({
  providedIn: 'root',
})
export class incidentService {
  private readonly baseUrl: string = `${environment.basePath}/api/incidents`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des incidents avec ou sans pagination.
   * @param withPaginate Indique si la pagination doit être activée.
   * @returns Observable avec la liste des incidents.
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
   * Crée un nouveau incident.
   * @param Incident Les données du incident à créer.
   * @returns Observable avec les informations du incident créé.
   */
  store(incident: Incident): Observable<IIncident> {
    return this.http.post<IIncident>(this.baseUrl, incident);
  }

  /**
   * Met à jour un incident existant.
   * @param id L'identifiant du incident à mettre à jour.
   * @param incident Les nouvelles données du incident.
   * @returns Observable avec les informations du incident mis à jour.
   */
  update(id: number, incident: Incident): Observable<IIncident> {
    return this.http.put<IIncident>(`${this.baseUrl}/${id}`, incident);
  }

  /**
   * Supprime un incident.
   * @param id L'identifiant du incident à supprimer.
   * @returns Observable avec le résultat de l'opération.
   */
  destroy(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  generatePDF(id: number){
    return 'test';
  }
}
