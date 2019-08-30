import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  apiUrl = 'http://localhost:8000/api';
  avatarUrl = 'http://127.0.0.1:8000/avatar';

  constructor(private http: HttpClient) {
  }

  getMe() {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateUser( user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/me/update`, user);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  updatePassword(password: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/changePassword`, password);
  }

}
