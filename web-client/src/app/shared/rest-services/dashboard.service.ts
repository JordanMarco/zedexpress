import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../models/User';
import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl: string = `${environment.basePath}/api/home`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des utilisateurs avec ou sans pagination.
   * @param page page pour la pagination.
   * @param accountId L'identifiant du compte pour filtrer.
   * @param withPaginate Indique si la pagination doit être activée.
   * @returns Observable avec la liste des utilisateurs.
   */
  public index(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.baseUrl, { });
  }

}
