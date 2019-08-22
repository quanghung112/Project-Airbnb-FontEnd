import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  findById(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  updateUser(idUser: any, user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${idUser}`, user);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }
}
