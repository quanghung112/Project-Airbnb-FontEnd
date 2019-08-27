import {Component, OnInit} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../../user/login-logout-service-backend-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogined: boolean;
  accessToken: any;

  constructor(private apiLogin: LoginLogoutServiceBackendApiService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      this.isLogined = true;
    } else {
      this.isLogined = false;
    }
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
