import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../login-logout-service-backend-api.service';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider} from 'angularx-social-login';
import {MatDialog, MatDialogRef} from '@angular/material';
import {RegisterComponent} from '../register/register.component';
import {UserApiService} from '../user-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  accessToken: string;
  message: string;
  idUser: any;

  constructor(private loginApi: LoginLogoutServiceBackendApiService,
              private userApi: UserApiService,
              private router: Router,
              private socialAuthService: AuthService,
              private dialogRef: MatDialogRef<LoginComponent>,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  login(loginForm: HTMLFormElement) {
    this.email = loginForm.email.value;
    this.password = loginForm.password.value;
    this.loginApi.login(this.email, this.password).subscribe(result => {
      this.idUser = result.idUser;
      if (result.status) {
        this.loginApi.isLogined = true;
        localStorage.setItem('ACCESS_TOKEN', result.token);
        this.accessToken = localStorage.getItem('ACCESS_TOKEN');
        localStorage.setItem('idUser', result.idUser);
        this.userApi.getMe().subscribe(userLogin => {
          this.loginApi.user = userLogin;
        });
        this.dialogRef.close();
        this.router.navigate(['/']);
      } else {
        this.message = result.message;
      }
    });
  }

  idUserLogIn(idUser) {
    this.idUser.sendIdUser(idUser);
  }

  loginFacebook() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.loginApi.loginFacebook(userData).subscribe(result => {
          localStorage.setItem('idUser', result.idUser);
          localStorage.setItem('ACCESS_TOKEN', result.token);
          this.loginApi.isLogined = true;
          this.userApi.getMe().subscribe(userLogin => {
            this.loginApi.user = userLogin;
            console.log(this.loginApi.user);
          });
          this.dialogRef.close();
          this.router.navigate(['/']);
        });
      }
    );
  }

  changePage() {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent, {
      width: '1200px',
      height: '1200px',
    });
  }
}
