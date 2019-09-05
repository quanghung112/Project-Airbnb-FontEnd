import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../../house/house-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list-user-order',
  templateUrl: './list-user-order.component.html',
  styleUrls: ['./list-user-order.component.scss']
})
export class ListUserOrderComponent implements OnInit {

  user: any;
  houses: any;
  users: any;
  house: any;

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private router: Router,
              private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
    });
    this.activeRoute.params.subscribe(params => {
      this.houseService.findById(params.id).subscribe(result => {
        this.house = result;
      });
      this.houseService.getUserOrder(params.id).subscribe(result => {
        console.log(result);
        this.users = result;
      });
    });
  }

  changeProfile() {
    this.router.navigate(['me']);
  }

  changeUpdate() {
    this.router.navigate(['me/update']);
  }

  return() {
    this.router.navigate(['me/posts/list']);
  }
}
