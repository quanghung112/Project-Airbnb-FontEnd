import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../house-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user: any;
  posts: any;

  constructor(private userService: UserApiService,
              private houseService: HouseApiService
  ) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
      this.houseService.getHouseOfUser(this.user.id).subscribe(data => {
        console.log(data);
        this.posts = data;
      });
    });
  }

}
