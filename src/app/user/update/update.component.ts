import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../user-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  user: any;
  name: any;
  avatar: any;
  address: any;
  gender: any;
  phone: any;

  errorName: any;
  errorAvatar: any;
  errorPhone: any;
  errorAddress: any;

  constructor(private userService: UserApiService, public activateRoute: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
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
      avatar: this.avatar,
      address: this.address,
      gender: this.gender,
      phone: this.phone
    };
    this.userService.updateUser(this.user).subscribe(
      result => {
        this.router.navigate(['/me']);
      },
      error => {

        this.errorName = error.error.error.name;
        this.errorAvatar = error.error.error.avatar;
        this.errorAddress = error.error.error.address;
        this.errorPhone = error.error.error.phone;
      }
    );
  }
}
