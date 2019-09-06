import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../house-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user: any;
  posts: any;
  usersOrder: any;
  house: any;
  status: any;

  constructor(private userService: UserApiService,
              private houseService: HouseApiService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
      this.getPost(this.user.id);
    });
  }

  deletePost(id: any) {
    if (confirm('Toàn bộ dữ liệu của bài đăng sẽ bị xóa bao gồm cả ảnh. Bạn có chắc chắn muốn xóa?')) {
      this.houseService.deletePost(id).subscribe(result => {
        this.houseService.message = 'Xóa bài đăng thành công!';
        this.getPost(this.user.id);
      });
    }
  }

  getPost(userId) {
    this.houseService.getHouseOfUser(userId).subscribe(data => {
      this.posts = data;
      for (let i = 0; i < this.posts.length; i++) {
        this.houseService.getUserOrder(this.posts[i].id).subscribe(result => {
          this.usersOrder = result;
          this.posts[i].convenient = this.usersOrder.length;
        });
      }
    });
  }

  getUserOrder(idPost) {
    this.houseService.getUserOrder(idPost).subscribe(result => {
      this.usersOrder = result;
    });
  }

  changeProfile() {
    this.router.navigate(['me']);
  }

  changeUpdate() {
    this.router.navigate(['me/update']);
  }

  changePage() {

  }

  changeStatus(id: any) {
    this.houseService.findById(id).subscribe(result => {
      this.house = result;
      this.status = this.house.status;
      if (this.status) {
        this.status = null;
      } else {
        this.status = 'true';
      }
      const data = {
          status: this.status
        };
      this.houseService.updatePost(id, data).subscribe(result2 => {
        this.getPost(this.user.id);
      });
    });
  }
}
