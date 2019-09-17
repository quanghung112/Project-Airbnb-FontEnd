import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail-in-post',
  templateUrl: './user-detail-in-post.component.html',
  styleUrls: ['./user-detail-in-post.component.scss']
})
export class UserDetailInPostComponent implements OnInit {
  private user: any;

  constructor(private userService: UserApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
    });
  }

  changeProfile() {
    this.router.navigate(['me']);
  }

  changeUpdate() {
    this.router.navigate(['me/update']);
  }
}
