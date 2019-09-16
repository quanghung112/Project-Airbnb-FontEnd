import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../user-api.service';
import {Router} from '@angular/router';
import {error} from 'util';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {AuthService, FacebookLoginProvider} from 'angularx-social-login';
import {LoginLogoutServiceBackendApiService} from '../login-logout-service-backend-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  username: string;
  message: string;
  errorMessage: any;

  constructor(protected loginApi: LoginLogoutServiceBackendApiService,
              private router: Router,
              private dialogRef: MatDialogRef<RegisterComponent>,
              private dialog: MatDialog,
              private socialAuthService: AuthService,
              private userApi: UserApiService,
  ) {
  }

  ngOnInit() {
  }

  signUp(signUpForm: HTMLFormElement) {
    this.email = signUpForm.email.value;
    this.password = signUpForm.password.value;
    this.username = signUpForm.username.value;
    const data = {
      email: this.email,
      password: this.password,
      username: this.username
    };
    this.userApi.register(data).subscribe((result) => {
        this.dialogRef.close();
        this.dialog.open(LoginComponent, {
          width: '1200px',
          height: '1200px',
        });
      },
      (error) => {
        this.errorMessage = error.error.error;
        console.log(this.errorMessage);
      });
  }

  changePage() {
    this.dialogRef.close();
    this.dialog.open(LoginComponent, {
      width: '1200px',
      height: '1200px',
    });
  }

  loginFacebook() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
        this.loginApi.loginFacebook(userData).subscribe(result => {
          localStorage.setItem('idUser', result.idUser);
          localStorage.setItem('ACCESS_TOKEN', result.token);
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
}
