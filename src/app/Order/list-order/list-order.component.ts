import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../../house/house-api.service';
import {Router} from '@angular/router';
import {OrderApiService} from '../order-api.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  user: any;
  houses: any;
  orders: any;
  message: any;
  userPost: any;
  body: any;
  house: any;

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private router: Router,
              public datePipe: DatePipe,
              private orderService: OrderApiService
  ) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
      this.getHousesOrder(this.user.id);
    });
  }

  getHousesOrder(userId) {
    this.orderService.getHouseOrder(userId).subscribe(data => {
      this.houses = data[0];
      this.orders = data[1];
    });
  }

  cancelOrder(idOrder: any, idHouse: any) {
    const data = {
      status: '0',
      userId: this.user.id
    };
    this.orderService.updateOrder(data, idOrder).subscribe(result => {
      this.message = result;
      if (this.message[1]) {
        this.getHousesOrder(this.user.id);
        this.houseService.getUserPostHouse(idHouse).subscribe(result2 => {
          this.userPost = result2;
          this.houseService.findById(idHouse).subscribe(house => {
            this.house = house;
            this.body = 'Khách hàng ' + this.user.username + ' đã hủy yêu cầu thuê nhà cho bài đăng: ' + this.house.title;
            const dataEmail = {
              name: this.userPost.username,
              email: this.userPost.email,
              body: this.body
            };
            this.orderService.sendEmail(dataEmail).subscribe(message => {
              console.log(message);
            });
          });
        });
      }
    });
  }
}
