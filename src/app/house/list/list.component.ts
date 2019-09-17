import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../house-api.service';
import {Router} from '@angular/router';
import {OrderApiService} from '../../Order/order-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user: any;
  houses: any;
  usersOrder: any;
  house: any;
  status: any;
  idUser = localStorage.getItem('idUser');

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private router: Router,
              private orderService: OrderApiService
  ) {
  }

  ngOnInit() {
    this.getPost();
  }

  deletePost(id: any) {
    if (confirm('Toàn bộ dữ liệu của bài đăng sẽ bị xóa bao gồm cả ảnh. Bạn có chắc chắn muốn xóa?')) {
      this.houseService.deletePost(id).subscribe(result => {
        this.houseService.message = 'Xóa bài đăng thành công!';
        this.getPost();
      });
    }
  }

  getPost() {
    this.houseService.getHouseOfUser(this.idUser).subscribe(data => {
      this.houses = data;
      if (this.houses) {
        for (let i = 0; i < this.houses.length; i++) {
          this.orderService.getUsersOrder(this.houses[i].id).subscribe(result => {
            this.usersOrder = result[0];
            this.houses[i].convenient = this.usersOrder.length;
          });
        }
      }
    });
  }

  getUserOrder(idPost) {
    this.orderService.getUsersOrder(idPost).subscribe(result => {
      this.usersOrder = result;
    });
  }

  changePage() {

  }

  changeStatus(id: any) {
    this.houseService.findById(id).subscribe(result => {
      this.house = result;
      this.status = this.house.status;
      if (this.status) {
        this.status = null;
      } else {
        this.status = 'true';
      }
      const data = {
        status: this.status
      };
      this.houseService.updateStatus(data, id).subscribe(result2 => {
        this.getPost();
      });
    });
  }
}
