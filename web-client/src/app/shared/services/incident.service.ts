import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident, IncidentListResponse, IncidentListParams } from '../models/incident.model';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = `${environment.basePath}/incidents`;

  constructor(private http: HttpClient) {}

  getIncidents(params: IncidentListParams): Observable<IncidentListResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<IncidentListResponse>(this.apiUrl, { params: httpParams });
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, incident);
  }

  updateIncident(id: number, incident: Incident): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/${id}`, incident);
  }

  deleteIncident(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generatePDF(incident: Incident): string {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 20;

    // Add title
    doc.setFontSize(20);
    doc.text('Incident Report', 20, y);
    y += lineHeight * 2;

    // Add content
    doc.setFontSize(12);
    doc.text(`Title: ${incident.title}`, 20, y);
    y += lineHeight;
    doc.text(`Client: ${incident.clientName}`, 20, y);
    y += lineHeight;
    doc.text(`Parcel: ${incident.parcelName}`, 20, y);
    y += lineHeight;
    doc.text(`Status: ${incident.status}`, 20, y);
    y += lineHeight;
    doc.text(`Created: ${new Date(incident.createdAt).toLocaleDateString()}`, 20, y);
    y += lineHeight * 2;

    // Add reason with word wrap
    doc.text('Reason:', 20, y);
    y += lineHeight;
    const splitReason = doc.splitTextToSize(incident.reason, 170);
    doc.text(splitReason, 20, y);

    return doc.output('datauristring');
  }
}