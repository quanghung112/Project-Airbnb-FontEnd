import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HouseApiService} from '../../house/house-api.service';
import {OrderApiService} from '../order-api.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-older-house',
  templateUrl: './older-house.component.html',
  styleUrls: ['./older-house.component.scss']
})
export class OlderHouseComponent implements OnInit {
  user: any;
  idHouse: any;
  house: any;
  phone: any;
  nameRenter: any;
  address: any;
  idUser = localStorage.getItem('idUser');
  start: any;
  end: any;
  message: any;

  constructor(private userApi: UserApiService,
              private activatedRoute: ActivatedRoute,
              private houseApi: HouseApiService,
              private orderService: OrderApiService,
              public datePipe: DatePipe,
              private router: Router) {
  }

  ngOnInit() {
    this.houseApi.message = '';
    this.activatedRoute.params.subscribe(params => {
      this.idHouse = params.id;
      this.houseApi.findById(this.idHouse).subscribe(result => {
        this.house = result;
      });
    });
    this.userApi.getMe().subscribe(result => {
      this.user = result;
    });
  }

  order(postForm: HTMLFormElement) {
    if (this.house.user_id === this.user.id) {
      this.houseApi.message = 'Bạn không thể đặt phòng của chính mình';
    } else {
      this.nameRenter = postForm.nameRenter.value;
      this.phone = postForm.phone.value;
      this.address = postForm.address.value;
      const data = {
        name: this.nameRenter,
        phone: this.phone,
        address: this.address,
      };
      const dataOrder = {
        user_id: this.idUser,
        house_id: this.idHouse,
        status: '1',
        check_in: this.house.start_loan,
        check_out: this.house.end_loan,
      };
      console.log(dataOrder);
      this.orderService.orderHouse(dataOrder).subscribe(result => {
        this.message = result;
        if (this.message.message[1]) {
          this.userApi.updateUser(data).subscribe(result2 => {
          });
          this.houseApi.message = this.message.message[0];
          this.router.navigate(['me/order/list']);
        } else {
          this.houseApi.message = this.message.message[0];
        }
      });
    }
  }
}
