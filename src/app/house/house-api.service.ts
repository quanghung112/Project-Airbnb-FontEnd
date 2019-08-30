import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HouseApiService {
  apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiUrl}/houses`);
  }
}

