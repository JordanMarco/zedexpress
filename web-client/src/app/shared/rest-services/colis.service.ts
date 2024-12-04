import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../models/User';
import { IColis } from '../models/colis';

@Injectable({
  providedIn: 'root',
})
export class ColisService {
  private readonly baseUrl: string = `${environment.basePath}/api/colis`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des utilisateurs avec ou sans pagination.
   * @param page page pour la pagination.
   * @param size taille pour la pagination.
   * @param searh valeur de recherche.
   * @returns Observable avec la liste des utilisateurs.
   */
  public index(page: number = 1, size: number = 10, search: string = ''): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('per_page', size);
    params = params.set('search', search);

    return this.http.get<any>(this.baseUrl, { params });
  }

  public tracking(): Observable<any> {
    let params = new HttpParams();
    return this.http.get<any>(this.baseUrl+'/tracking', { params });
  }


  public withdrawal(page: number = 1, size: number = 10, search: string = ''): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('per_page', size);
    params = params.set('search', search);

    return this.http.get<any>(this.baseUrl+'/withdrawal', { params });
  }

  public store(colis: User): Observable<IColis> {
    return this.http.post<IColis>(this.baseUrl, colis);
  }

  public update(id: number, colis: IColis): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, colis);
  }

  public send(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send/${id}`, {});
  }

  public remove(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/remove/${id}`, {});
  }

  public destroy(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  public allColis(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/all-colis', { });
  }
}
