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
        this.start = this.datePipe.transform(this.house.start_loan, 'dd-MM-yyyy');
        this.end = this.datePipe.transform(this.house.end_loan, 'dd-MM-yyyy');
      });
    });
    this.userApi.getMe().subscribe(result => {
      // console.log(result);
      this.user = result;
    });
  }

  post(postForm: HTMLFormElement) {
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
        avatar: ''
      };
      const dataOrder = {
        user_id: this.idUser,
        house_id: this.idHouse
      };
      // console.log(dataOrder);
      this.orderService.orderHouse(dataOrder).subscribe(result2 => {
        this.message = result2;
        console.log(this.message);
        if (this.message.message[1]) {
          this.userApi.updateUser(data).subscribe(result => {
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
