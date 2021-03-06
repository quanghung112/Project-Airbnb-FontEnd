import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HouseApiService {
  apiUrl = 'http://localhost:8000/api';
  message: any;
  imageUrl = 'http://127.0.0.1:8000/image';
  searchHouse: any;


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

  search(data: any) {
    return this.http.post(`${this.apiUrl}/houses/search`, data);
  }

  getHouseSearch(data: any) {
    this.searchHouse = data;
  }

  getUpdateRevenue(houseId: any) {
    return this.http.get(`${this.apiUrl}/houses/revenue/${houseId}`);
  }

  getUpdateCancelRevenue(houseId: any) {
    return this.http.get(`${this.apiUrl}/houses/revenue-cancel/${houseId}`);
  }

  getComment(houseId: any) {
    return this.http.get(`${this.apiUrl}/houses/${houseId}/comments`);
  }

  getUsersComment(idHouse: any) {
    return this.http.get(`${this.apiUrl}/houses/${idHouse}/get_user_comment`);
  }

  postComment(data: any, idHouse: any) {
    return this.http.post(`${this.apiUrl}/houses/${idHouse}/create_comment`, data);
  }

  deleteComment(idComment: any) {
    return this.http.delete(`${this.apiUrl}/comments/${idComment}/delete_comment`);
  }

  updateComment(data: any, idComment: any) {
    return this.http.post(`${this.apiUrl}/comments/${idComment}/update_comment`, data);
  }

  updateTimeComment(idComment) {
    // @ts-ignore
    return this.http.post(`${this.apiUrl}/comments/${idComment}/update_time_comment`);
  }

  getUserPostHouse(houseId: any) {
    return this.http.get(`${this.apiUrl}/houses/${houseId}/user`);
  }

  updateStatus(data: any, houseId: any) {
    return this.http.post(`${this.apiUrl}/houses/updateStatus/${houseId}`, data);
  }
}

