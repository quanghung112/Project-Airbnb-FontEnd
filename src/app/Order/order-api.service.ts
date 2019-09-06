import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  apiUrl = 'http://localhost:8000/api';
  message: any;

  constructor(private http: HttpClient) {
  }

  orderHouse(data: any) {
    return this.http.post(`${this.apiUrl}/order`, data);
  }

  getUserOrder(houseId: any) {
    return this.http.get(`${this.apiUrl}/getUserOrder/${houseId}`);
  }

  getHouseOrder(userId) {
    return this.http.get(`${this.apiUrl}/getHouseOrder/${userId}`);
  }

  acceptOrder(data, idOrder) {
    return this.http.post(`${this.apiUrl}/updateOrder/${idOrder}`, data);
  }
}
