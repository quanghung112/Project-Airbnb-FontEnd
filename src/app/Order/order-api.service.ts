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

  getUsersOrder(houseId: any) {
    return this.http.get(`${this.apiUrl}/getUserOrder/${houseId}`);
  }

  getHouseOrder(userId) {
    return this.http.get(`${this.apiUrl}/getHouseOrder/${userId}`);
  }

  updateOrder(data, idOrder) {
    return this.http.post(`${this.apiUrl}/updateOrder/${idOrder}`, data);
  }

  sendEmail(data: any) {
    return this.http.post(`${this.apiUrl}/send-mail`, data);
  }

  getUserOrder(idOrder: any) {
    return  this.http.get(`${this.apiUrl}/orders/${idOrder}/user`);
  }
}
