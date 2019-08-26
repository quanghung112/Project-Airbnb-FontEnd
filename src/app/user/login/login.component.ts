import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../login-logout-service-backend-api.service';
import {Router} from '@angular/router';
import {DataService } from '../../services/data.service';

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
              private router: Router
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
      this.idUser = result.idUser;
      if (result.status) {
        this.router.navigate([`/`]);
      } else {
        this.message = result.message;
      }
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
  idUserLogIn(idUser) {
    this.idUser.sendIdUser(idUser);
  }
}
