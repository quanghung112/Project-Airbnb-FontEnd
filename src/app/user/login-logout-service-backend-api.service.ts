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

  constructor(
    private http: HttpClient
  ) {
  }

  login(email: string, password: string): Observable<any> {
    const data = {email, password};
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      map(result => {
        // localStorage.setItem('isLogined', '1');
        this.isLogined = true;
        return result;
      })
    );
  }

  logout(token: string) {
    return this.http.post(`${this.apiUrl}/logout`, token).pipe(
      map(result => {
        // localStorage.removeItem('isLogined');
        this.isLogined = false;
        return result;
      })
    );
  }

  loginFacebook(socialUser: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginFacebook`, socialUser).pipe(
      map(result => {
        // localStorage.setItem('isLogined', '1');
        this.isLogined = true;
        return result;
      })
    );
  }
}
