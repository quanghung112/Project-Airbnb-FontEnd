import {Component, OnInit} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../../user/login-logout-service-backend-api.service';
import {Router} from '@angular/router';
import {UserApiService} from '../../user/user-api.service';
import {LoginComponent} from '../../user/login/login.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {RegisterComponent} from '../../user/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accessToken: any;
  // UserDetail: any;

  constructor(private apiLogin: LoginLogoutServiceBackendApiService,
              private router: Router, public userService: UserApiService,
              private dialog: MatDialog,
              // private dialogRef: MatDialogRef<LoginComponent>,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      this.userService.getMe().subscribe(result => {
        this.apiLogin.user = result;
        // console.log(result);
      });
      this.apiLogin.isLogined = true;
    } else {
      this.apiLogin.isLogined = false;
    }
  }
  logout($event: MouseEvent) {
    event.preventDefault();
    this.accessToken = localStorage.getItem('ACCESS_TOKEN');
    localStorage.removeItem('isLogined');
    localStorage.removeItem('idUser');
    this.accessToken = null;
    this.apiLogin.logout(this.accessToken).subscribe(result => {
        localStorage.removeItem('ACCESS_TOKEN');
        // console.log(result);
        this.router.navigate(['/']);
      }, error => {
        localStorage.removeItem('ACCESS_TOKEN');
      }
    );
  }

  changePage() {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      // console.log(localStorage.getItem('ACCESS_TOKEN'));
      this.router.navigate(['me/post']);
    } else {
      this.Login();
    }
  }

  Login() {
    // this.dialogRef.close();
    this.dialog.open(LoginComponent, {
      width: '1200px',
      height: '1200px',
    });
  }

  Register() {
    // this.dialogRef.close();
    this.dialog.open(RegisterComponent, {
      width: '1200px',
      height: '1200px',
    });
  }
}
