import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutServiceBackendApiService {
  apiUrl = 'http://localhost:8000/api';
  // public isLogined = localStorage.getItem('ACCESS_TOKEN');
  public isLogined = false;
  public user: any;

  constructor(
    private http: HttpClient
  ) {
  }

  login(email: string, password: string): Observable<any> {
    const data = {email, password};
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(token: string) {
    return this.http.post(`${this.apiUrl}/logout`, token);
  }

  loginFacebook(socialUser: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginFacebook`, socialUser);
  }
}
