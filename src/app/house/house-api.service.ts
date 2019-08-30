import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HouseApiService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(`${this.apiUrl}/houses`);
  }

  createPost(data: any) {
    return this.http.post(`${this.apiUrl}/houses/create`, data);
  }

  findById(id: any) {
    return this.http.get(`${this.apiUrl}/houses/${id}`);
  }
}

