import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../user/user-api.service";
import {HouseApiService} from "../../house/house-api.service";
import {OrderApiService} from "../order-api.service";

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  user: any;
  houses: any;
  revanue: any;
  startLoan: any;
  endLoan: any;
  totalRevenue = 0;
  totalOrder = 0;
  add: any;
  addRevenue: any;
  orders: any;

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private orderService: OrderApiService
  ) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
      this.getHouse(this.user.id);
    });
  }

  getHouse(UserId) {
    // console.log(UserId)
    this.houseService.getHouseOfUser(UserId).subscribe(result => {
      this.houses = result;
      // console.log(this.houses);
      for (let i = 0; i < this.houses.length; i++) {
        this.add = Number(this.houses[i].revenue);
        this.totalRevenue = this.totalRevenue + this.add;
      }
    });
  }

  searchtime(searchForm: HTMLFormElement) {
    this.startLoan = searchForm.startdate.value;
    this.endLoan = searchForm.enddate.value;
    const datatime = {
      start_loan: this.startLoan,
      end_loan: this.endLoan,
    };
    this.orderService.searchtime(datatime).subscribe(result => {
      this.orders = result;
      console.log(this.orders);
      for (let i = 0; i < this.orders.length; i++) {
        this.addRevenue = Number(this.orders[i].revenue);
        this.totalOrder = this.totalOrder + this.addRevenue;
      }
    });
  }
}
