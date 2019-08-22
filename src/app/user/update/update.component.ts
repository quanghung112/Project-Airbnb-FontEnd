import { Component, OnInit } from '@angular/core';
import {UserApiService} from "../user-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  idUpdate: any;
  user: any;
  name: any;
  avatar: any;
  address: any;
  gender: any;
  phone: any;
  constructor(private userService: UserApiService, public activateRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idUpdate = params.id;
    });
    this.getUserById();
  }
  getUserById() {
    this.userService.findById(this.idUpdate).subscribe(result => {
      this.user = result;
      console.log(this.user);
    });
  }
  updateUser(updateUserForm) {
    this.name = updateUserForm.name.value;
    this.avatar = updateUserForm.avatar.value;
    this.address = updateUserForm.address.value;
    this.gender = updateUserForm.gender.value;
    this.phone = updateUserForm.phone.value;
    this.user = {
      name: this.name,
      avatar : this.avatar,
      address : this.address,
      gender : this.gender,
      phone : this.phone
    };
    this.userService.updateUser(this.idUpdate, this.user).subscribe(result => {
      console.log(result);
      this.router.navigate([`/users/${this.idUpdate}`]);
    });
  }
}
