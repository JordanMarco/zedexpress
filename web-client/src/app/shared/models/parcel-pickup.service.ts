import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParcelPickup, ParcelPickupResponse, ParcelPickupParams } from '../models/parcel-pickup.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelPickupService {
  private apiUrl = `${environment.basePath}/parcels/pickup`;

  constructor(private http: HttpClient) {}

  getPickupParcels(params: ParcelPickupParams): Observable<ParcelPickupResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<ParcelPickupResponse>(this.apiUrl, { params: httpParams });
  }

  retrieveParcel(id: number): Observable<ParcelPickup> {
    return this.http.patch<ParcelPickup>(`${this.apiUrl}/${id}/retrieve`, {});
  }
}