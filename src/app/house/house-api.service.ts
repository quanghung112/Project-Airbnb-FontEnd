import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseApiService {
  apiUrl = 'http://localhost:8000/api/houses';

  constructor(private http: HttpClient) {
  }

  createPost(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}
