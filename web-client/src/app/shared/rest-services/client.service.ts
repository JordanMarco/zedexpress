import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl: string = `${environment.basePath}/api/clients`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des utilisateurs avec ou sans pagination.
   * @param page page pour la pagination.
   * @param accountId L'identifiant du compte pour filtrer.
   * @param withPaginate Indique si la pagination doit être activée.
   * @returns Observable avec la liste des utilisateurs.
   */
  public index(page: number = 1, size: number = 10, search: string = '', accountId?: number, withPaginate: boolean = true): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('per_page', size);
    params = params.set('search', search);
    if (accountId) {
      params = params.set('account_id', accountId);
    }
    params = params.set('with_paginate', withPaginate);

    return this.http.get<any>(this.baseUrl, { params });
  }

  public store(user: User): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user);
  }

  public update(id: number, user: User): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

}
