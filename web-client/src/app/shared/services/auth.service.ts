import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  constructor(private afu: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.afu.authState.subscribe((auth: any) => {
      this.authState = auth;
    });
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return this.authState !== null ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser(): any {
    return this.authState !== null ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

  registerWithEmail(email: string, password: string) {
    return this.afu
      .createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
        this.authState = user;
      })
      .catch((_error: any) => {
        console.log(_error);
        throw _error;
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afu
      .signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        this.authState = user;
      })
      .catch((_error: any) => {
        console.log(_error);
        throw _error;
      });
  }

  singout(): void {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }

  

  /**
   * Login
   * with verification code
   * @param body
   */
  public loginWithVerificationCode(body?: Login): Observable<ILoginResponse> {
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
