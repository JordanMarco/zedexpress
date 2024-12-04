import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly baseUrl: string = `${environment.basePath}/api/pay`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des tarifs avec ou sans pagination.
   * @param withPaginate Indique si la pagination doit être activée.
   * @returns Observable avec la liste des tarifs.
   */
  pay(id: number): Observable<any> {
    let params = new HttpParams();
    return this.http.post<any>(`${this.baseUrl}/${id}`, { params });
  }

  checkStatus(id: number): Observable<any> {
    let params = new HttpParams();
    return this.http.get<any>(`${this.baseUrl}/view/${id}`, { params });
  }

}
