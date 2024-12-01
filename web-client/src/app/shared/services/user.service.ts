import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserListResponse, UserListParams } from '../models/user.model';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.basePath}/users`;

  constructor(private http: HttpClient) {}

  getUsers(params: UserListParams): Observable<UserListResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<UserListResponse>(this.apiUrl, { params: httpParams });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}