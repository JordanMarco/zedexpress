import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ILoginResponse, Login } from '../models/User';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  protected basePath = environment.basePath;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  authState: any;

  constructor(private router: Router, private http: HttpClient) {
 
  }

  /**
   * Login
   * with verification code
   * @param body
   */
  public login(body?: Login): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.basePath}/api/login`,
      body,
      this.httpOptions
    );
  }

  /**
   * logout
   */
  public logout(): Observable<any> {
    return this.http.post<any>(
      `${this.basePath}/api/logout`,
      {},
      this.httpOptions
    );
  }
}
