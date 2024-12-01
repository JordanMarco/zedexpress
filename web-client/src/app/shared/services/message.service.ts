import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, MessageListResponse, MessageListParams } from '../models/message.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.basePath}/messages`;

  constructor(private http: HttpClient) {}

  getMessages(params: MessageListParams): Observable<MessageListResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<MessageListResponse>(this.apiUrl, { params: httpParams });
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateMessageStatus(id: number, status: 'RESOLVED' | 'PENDING'): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/${id}/status`, { status });
  }
}