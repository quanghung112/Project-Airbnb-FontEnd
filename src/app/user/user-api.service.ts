import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}

  findById(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
}
