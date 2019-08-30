import {Component, OnInit} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../../user/login-logout-service-backend-api.service';
import {Router} from '@angular/router';
import {UserApiService} from "../../user/user-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogined: boolean;
  accessToken: any;
  UserDetail: any;

  constructor(private apiLogin: LoginLogoutServiceBackendApiService,
              private router: Router, public userService: UserApiService) {
  }

  ngOnInit() {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      this.isLogined = true;
    } else {
      this.isLogined = false;
    }
    this.userService.getMe().subscribe(result => {
      this.UserDetail = result;
      // console.log(this.UserDetail);
    });
  }

  logout($event: MouseEvent) {
    event.preventDefault();
    this.accessToken = localStorage.getItem('ACCESS_TOKEN');
    this.apiLogin.logout(this.accessToken).subscribe(result => {
        console.log(result);
        localStorage.removeItem('ACCESS_TOKEN');
        this.accessToken = null;
        this.router.navigate(['/']);
      }
    );
  }
}
