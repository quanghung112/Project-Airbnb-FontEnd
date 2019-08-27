import {Component, Input, OnInit} from '@angular/core';
import {LoginLogoutServiceBackendApiService} from '../../user/login-logout-service-backend-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
