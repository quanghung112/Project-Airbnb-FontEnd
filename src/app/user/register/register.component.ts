import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../user-api.service';
import {Router} from '@angular/router';

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

  constructor(protected api: UserApiService,
              private router: Router) {
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
    this.api.register(data).subscribe(result => {
      if (result.status) {
        this.router.navigate(['/']);
      } else {
        this.message = 'error';
      }
    });
  }
}
