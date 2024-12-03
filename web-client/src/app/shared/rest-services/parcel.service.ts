import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcel, ParcelListResponse, ParcelListParams } from '../models/parcel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private apiUrl = `${environment.basePath}/parcels`;

  constructor(private http: HttpClient) {}

  getParcels(params: ParcelListParams): Observable<ParcelListResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<ParcelListResponse>(this.apiUrl, { params: httpParams });
  }

  getParcelForPickup(): Observable<ParcelListResponse> {
    return this.http.get<ParcelListResponse>(`${this.apiUrl}/pickup`);
  }

  createParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.post<Parcel>(this.apiUrl, parcel);
  }

  updateParcel(id: number, parcel: Parcel): Observable<Parcel> {
    return this.http.put<Parcel>(`${this.apiUrl}/${id}`, parcel);
  }

  deleteParcel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  sendParcel(id: number): Observable<Parcel> {
    return this.http.patch<Parcel>(`${this.apiUrl}/${id}/send`, {});
  }

  calculatePrice(weight: number, width: number, height: number, length: number): number {
    const volumeInM3 = (width * height * length) / 1000000; // Convert cm³ to m³
    return weight + volumeInM3;
  }
}