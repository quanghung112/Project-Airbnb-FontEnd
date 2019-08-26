import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../user-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  idUpdate: any;
  password: any;
  messenger: any;
  // tslint:disable-next-line:variable-name
  new_password: any;
  // tslint:disable-next-line:variable-name
  current_password: any;
  // tslint:disable-next-line:variable-name
  new_password_confirmation: any;
  constructor(private userService: UserApiService, public activateRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idUpdate = params.id;
    });
  }
  updatePassword(updatePasswordForm) {
    this.current_password = updatePasswordForm.current_password.value;
    this.new_password = updatePasswordForm.new_password.value;
    this.new_password_confirmation = updatePasswordForm.new_password_confirmation.value;
    this.password = {
      current_password: this.current_password,
      new_password : this.new_password,
      new_password_confirmation : this.new_password_confirmation
    };
    console.log(this.password);
    this.userService.updatePassword(this.password).subscribe(result => {
      // this.router.navigate([`/users/${this.idUpdate}`]);
      this.messenger = result;
    });
  }
}
