import {Component, OnInit} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../login-logout-service-backend-api.service';
import {Router} from '@angular/router';

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

  constructor(private api: LoginLogoutServiceBackendApiService,
              private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(loginForm: HTMLFormElement) {
    this.email = loginForm.email.value;
    this.password = loginForm.password.value;
    const array = [this.email, this.password];
    this.api.login(this.email, this.password).subscribe(result => {
      console.log(result);
      localStorage.setItem('ACCESS_TOKEN', result.token);
      this.accessToken = localStorage.getItem('ACCESS_TOKEN');
      this.message = result.message;
    });
  }

  logout($event: MouseEvent) {
    event.preventDefault();
    this.api.logout(this.accessToken).subscribe(result => {
      console.log(result);
      localStorage.removeItem('ACCESS_TOKEN');
      this.accessToken = null;
      console.log(localStorage.getItem);
    });
  }
}
