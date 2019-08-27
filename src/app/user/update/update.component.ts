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
  errorMessage: any;

  constructor(private userService: UserApiService, public activateRoute: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
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
        this.errorMessage = error.error.error;
        console.log(this.errorMessage);
      }
      );
  }
}
