import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {ActivatedRoute} from '@angular/router';
import {HouseApiService} from '../../house/house-api.service';

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

  constructor(private userApi: UserApiService,
              private activatedRoute: ActivatedRoute,
              private houseApi: HouseApiService) {
  }

  ngOnInit() {
    this.houseApi.message = '';
    this.activatedRoute.params.subscribe(params => {
      this.idHouse = params.id;
      this.houseApi.findById(this.idHouse).subscribe(result => {
        console.log(result);
        this.house = result;
      });
    });
    this.userApi.getMe().subscribe(result => {
      console.log(result);
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
        address: this.address
      };
      this.userApi.updateUser(data).subscribe(result => {
      });
      const dataOrder = {
        user_id: this.idUser,
        house_id: this.idHouse
      };
      console.log(dataOrder);
      this.houseApi.orderHouse(dataOrder).subscribe(result2 => {
        console.log(result2);
      });
    }
  }
}
