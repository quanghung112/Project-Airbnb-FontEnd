import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../user-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';

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
  url: any;

  constructor(private userService: UserApiService, public activateRoute: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
      console.log(this.user);
      if (this.user.avatar) {
        this.url = `${this.userService.avatarUrl}/${this.user.avatar}`;
      }
    });
  }

  onSelectFile(event) {
    this.avatar = event.target.files[0];
    // console.log(this.avatar);
    const reader = new FileReader();
    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  updateUser(updateUserForm) {
    this.name = updateUserForm.name.value;
    this.address = updateUserForm.address.value;
    this.gender = updateUserForm.gender.value;
    this.phone = updateUserForm.phone.value;
    const myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('name', this.name);
    myFormData.append('address', this.address);
    myFormData.append('gender', this.gender);
    myFormData.append('phone', this.phone);
    myFormData.append('avatar', this.avatar);
    this.userService.updateUser(myFormData).subscribe(
      result => {
        console.log(result);
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
