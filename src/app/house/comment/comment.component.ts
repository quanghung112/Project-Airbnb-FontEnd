import {Component, Input, OnInit} from '@angular/core';
import {HouseApiService} from '../house-api.service';
import {UserApiService} from '../../user/user-api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() idHouse: number;
  @Input() idUserOfHouse: number;
  check = false;
  idUser = localStorage.getItem('idUser');
  comments: any;
  users: any;
  comment: any;
  idComment: any;
  message: any;

  constructor(private houseService: HouseApiService,
              private userService: UserApiService
  ) {
  }

  ngOnInit() {
    this.getComments();
    this.getUsers();
    this.setIdUser();
    this.updateTimeComment();
  }

  getComments() {
    this.houseService.getComment(this.idHouse).subscribe(result => {
      this.comments = result;
      this.updateTimeComment();
    });

  }

  getUsers() {
    this.houseService.getUsersComment(this.idHouse).subscribe(users => {
      this.users = users;
    });
  }

  setIdUser() {
    this.idUser = localStorage.getItem('idUser');
  }

  Post(formComment: HTMLFormElement) {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      this.comment = formComment.comment.value;
      const data = {
        comment: this.comment,
        user_id: this.idUser
      };
      // console.log(data);
      this.houseService.postComment(data, this.idHouse).subscribe(result => {
        formComment.reset();
        this.getComments();
        this.getUsers();
      });
    } else {
      this.message = 'Bạn cần đăng nhập để có thể đánh giá';
    }
  }

  delete(idComment: any) {
    this.houseService.deleteComment(idComment).subscribe(result => {
      this.getComments();
      this.getUsers();
    });
  }

  update(updateComment: HTMLFormElement) {
    this.comment = updateComment.comment.value;
    const data = {
      comment: this.comment
    };
    this.houseService.updateComment(data, this.idComment).subscribe(result => {
      // console.log(result);
      this.getComments();
      this.check = false;
    });
  }

  change(id: any) {
    this.check = true;
    this.idComment = id;
  }

  updateTimeComment() {
    if (this.comments && this.comments.length > 0) {
      for (let i = 0; i < this.comments.length; i++) {
        this.houseService.updateTimeComment(this.comments[i].id).subscribe(result => {
        });
      }
    }
  }
}
