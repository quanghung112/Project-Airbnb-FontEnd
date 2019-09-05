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

  getPost(userId) {
    this.houseService.getHouseOfUser(userId).subscribe(data => {
      this.posts = data;
    });
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
        console.log(result);
        this.houseService.message = 'Xóa bài đăng thành công!';
        this.getPost(this.user.id);
      });
    }
  }
}
