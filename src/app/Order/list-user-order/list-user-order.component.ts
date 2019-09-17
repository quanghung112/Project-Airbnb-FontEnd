import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../../house/house-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderApiService} from '../order-api.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-user-order',
  templateUrl: './list-user-order.component.html',
  styleUrls: ['./list-user-order.component.scss']
})
export class ListUserOrderComponent implements OnInit {

  user: any;
  houses: any;
  users: any;
  house: any;
  orders: any;
  idHouse: any;
  render: any;
  body: any;

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              public datePipe: DatePipe,
              private orderService: OrderApiService
  ) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
    });
    this.activeRoute.params.subscribe(params => {
      this.idHouse = params.id;
      this.houseService.findById(this.idHouse).subscribe(result => {
        this.house = result;
      });
      this.getUsersOrder(params.id);
    });
  }

  getUsersOrder(idHouse) {
    this.orderService.getUsersOrder(idHouse).subscribe(result => {
      this.users = result[0];
      this.orders = result[1];
    });
  }

  return() {
    this.router.navigate(['me/posts/list']);
  }

  cancelOrder(idOrder: any, idHouse: any) {
    const dataOrder = {
      status: '0',
      userId: ''
    };
    if (confirm('Bạn không thể khôi phục khách đặt thuê này nữa! bạn có chắc chắn muốn hủy?')) {
      this.orderService.updateOrder(dataOrder, idOrder).subscribe(result => {
        this.getUsersOrder(this.idHouse);
        const message = 'Chủ nhà đã huỷ yêu cầu thuê nhà cho bài đăng: "';
        this.sendMail(idOrder, message);
        this.houseService.getUpdateCancelRevenue(idHouse).subscribe(result1 => {
        });
      });
    }
  }

  acceptOrder(idOrder: any, idHouse: any) {
    const dataOrder = {
      status: '2',
      userId: ''
    };
    this.orderService.updateOrder(dataOrder, idOrder).subscribe(result => {
      this.getUsersOrder(this.idHouse);
      const message = 'Chủ nhà đã chấp nhận yêu cầu thuê nhà cho bài đăng: "';
      this.sendMail(idOrder, message);
      this.houseService.getUpdateRevenue(idHouse).subscribe(result1 => {
        console.log('success');
      });
    });
  }

  sendMail(idOrder: any, message: any) {
    this.orderService.getUserOrder(idOrder).subscribe(result => {
      this.render = result;
      this.body = message + this.house.title + ' "';
      const dataEmail = {
        name: this.render.username,
        email: this.render.email,
        body: this.body
      };
      this.orderService.sendEmail(dataEmail).subscribe(result2 => {
        console.log(result2);
      });
    });
  }
}
