import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutServiceBackendApiService {
  apiUrl = 'http://localhost:8000/api';
  constructor(
    private http: HttpClient
  ) { }
  login(email: string, password: string): Observable<any> {
    const data = {email, password};
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
