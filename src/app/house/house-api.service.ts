import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HouseApiService {
  apiUrl = 'http://localhost:8000/api';
  message: any;
  imageUrl = 'http://127.0.0.1:8000/image';


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

  saveImage(data: any) {
    return this.http.post(`${this.apiUrl}/houses/saveImage`, data);
  }

  getNewHouse(userId: any) {
    return this.http.get(`${this.apiUrl}/houses/newHouse/${userId}`);
  }

  getHouseOfUser(userId: any) {
    return this.http.get(`${this.apiUrl}/houses/getHousesOfUser/${userId}`);
  }


  updateHouse(data: any, idHouse: any) {
    return this.http.post(`${this.apiUrl}/houses/update/${idHouse}`, data);
  }

  getImageByHouse(houseId: any) {
    return this.http.get(`${this.apiUrl}/houses/getImageByHouse/${houseId}`);
  }

  getImageOfHouse(houseId: any) {
    return this.http.get(`${this.apiUrl}/houses/getImageHouse/${houseId}`);
  }

  deleteImage(imageId: any) {
    return this.http.delete(`${this.apiUrl}/houses/deleteImage/${imageId}`);
  }

  updatePost(houseId, data: any) {
    return this.http.post(`${this.apiUrl}/houses/updatePost/${houseId}`, data);
  }

  deletePost(houseId: any) {
    return this.http.delete(`${this.apiUrl}/houses/deletePost/${houseId}`);
  }
}

