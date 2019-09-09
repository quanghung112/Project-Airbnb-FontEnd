import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../../house/house-api.service';
import {Router} from '@angular/router';
import {OrderApiService} from '../order-api.service';

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

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private router: Router,
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
      // console.log(data);
      this.houses = data[0];
      console.log(this.houses);
      this.orders = data[1];
      console.log(this.orders);
    });
  }

  changeProfile() {
    this.router.navigate(['me']);
  }

  changeUpdate() {
    this.router.navigate(['me/update']);
  }

  cancelOrder(idOrder: any) {
    const data = {
      status: '0',
      userId: this.user.id
    };
    this.orderService.updateOrder(data, idOrder).subscribe(result => {
      // console.log(result);
      this.message = result;
      this.getHousesOrder(this.user.id);
    });
  }
}
