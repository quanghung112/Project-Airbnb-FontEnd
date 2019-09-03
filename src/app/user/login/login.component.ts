import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../login-logout-service-backend-api.service';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider} from 'angularx-social-login';


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

  constructor(private api: LoginLogoutServiceBackendApiService,
              private router: Router,
              private socialAuthService: AuthService
  ) {
  }

  ngOnInit() {
  }

  login(loginForm: HTMLFormElement) {
    this.email = loginForm.email.value;
    this.password = loginForm.password.value;
    this.api.login(this.email, this.password).subscribe(result => {
      localStorage.setItem('ACCESS_TOKEN', result.token);
      this.accessToken = localStorage.getItem('ACCESS_TOKEN');
      localStorage.setItem('idUser', result.idUser);
      console.log(this.api.isLogined);
      this.idUser = result.idUser;
      if (result.status) {
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
        console.log(userData);
        this.api.loginFacebook(userData).subscribe(result => {
          localStorage.setItem('idUser', result.idUser);
          localStorage.setItem('ACCESS_TOKEN', result.token);
          this.router.navigate(['/']);
        });
      }
    );

  }
}
