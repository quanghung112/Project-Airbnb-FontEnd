import { Component, OnInit } from '@angular/core';
import {UserApiService} from "../../user/user-api.service";
import {HouseApiService} from "../../house/house-api.service";

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
  add: any;
  constructor(private userService: UserApiService,
              private houseService: HouseApiService
            ) { }
  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
      this.getHouse(this.user.id);
    });
  }
  getHouse(UserId) {
    console.log(UserId)
    this.houseService.getHouseOfUser(UserId).subscribe(result => {
      this.houses = result;
      console.log(this.houses);
      for (let i = 0 ; i < this.houses.length; i++ ) {
        this.add = Number(this.houses[i].revenue);
        this.totalRevenue = this.totalRevenue + this.add;
      }
    });
  }
}
