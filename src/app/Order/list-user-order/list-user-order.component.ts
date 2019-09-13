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
      this.getUserOrder(params.id);
    });
  }

  getUserOrder(idHouse) {
    this.orderService.getUserOrder(idHouse).subscribe(result => {
      this.users = result[0];
      this.orders = result[1];
    });
  }

  changeProfile() {
    this.router.navigate(['me']);
  }

  changeUpdate() {
    this.router.navigate(['me/update']);
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
        this.getUserOrder(this.idHouse);
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
      // console.log(result);
      this.getUserOrder(this.idHouse);
      this.houseService.getUpdateRevenue(idHouse).subscribe(result1 => {
        console.log('success');
      });
    });
  }
}
