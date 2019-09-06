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

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private router: Router,
              private orderService: OrderApiService
  ) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
      this.orderService.getHouseOrder(this.user.id).subscribe(data => {
        console.log(data);
        this.houses = data[0];
        this.orders = data[1];
      });
    });
  }

  changeProfile() {
    this.router.navigate(['me']);
  }

  changeUpdate() {
    this.router.navigate(['me/update']);
  }
}
