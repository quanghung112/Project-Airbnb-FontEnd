import {Component, OnInit} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../../user/login-logout-service-backend-api.service';
import {Router} from '@angular/router';
import {UserApiService} from '../../user/user-api.service';
import {LoginComponent} from '../../user/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogined = localStorage.getItem('isLogined');
  accessToken: any;
  UserDetail: any;
  // dialogRef = dialog.open(LoginComponent, {
  //   height: '400px',
  //   width: '600px',
  // });
  constructor(private apiLogin: LoginLogoutServiceBackendApiService,
              private router: Router, public userService: UserApiService) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.UserDetail = result;
      console.log(this.UserDetail);
    });
  }

  logout($event: MouseEvent) {
    event.preventDefault();
    this.accessToken = localStorage.getItem('ACCESS_TOKEN');
    localStorage.removeItem('isLogined');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('idUser');
    this.accessToken = null;
    this.apiLogin.logout(this.accessToken).subscribe(result => {
        console.log(result);
        this.router.navigate(['/']);
      }
    );
  }

  changePage() {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      console.log(localStorage.getItem('ACCESS_TOKEN'));
      this.router.navigate(['me/post/1']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
