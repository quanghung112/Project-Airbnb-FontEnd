import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../user-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  idUser: any;
  UserDetail: any;

  constructor(public userService: UserApiService, public activatedRoute: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.UserDetail = result;
      // console.log(this.UserDetail);
    });
  }
}
