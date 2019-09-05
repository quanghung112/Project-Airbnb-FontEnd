import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../user-api.service';
import {Router} from '@angular/router';
import {error} from 'util';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  username: string;
  message: string;
  errorMessage: any;

  constructor(protected api: UserApiService,
              private router: Router,
              private dialogRef: MatDialogRef<RegisterComponent>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  signUp(signUpForm: HTMLFormElement) {
    this.email = signUpForm.email.value;
    this.password = signUpForm.password.value;
    this.username = signUpForm.username.value;
    const data = {
      email: this.email,
      password: this.password,
      username: this.username
    };
    this.api.register(data).subscribe((result) => {
        this.dialogRef.close();
        this.dialog.open(LoginComponent, {
          width: '1200px',
          height: '1200px',
        });
      },
      (error) => {
        this.errorMessage = error.error.error;
        console.log(this.errorMessage);
      });
  }
}
