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
  isLogined = false;

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
      this.isLogined = true;
    });
  }
}
