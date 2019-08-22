import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailComponent} from './user/detail/detail.component';
import {LoginComponent} from './user/login/login.component';
import {LoginedGuard} from './logined.guard';
import {UpdateComponent} from './user/update/update.component';
import {RegisterComponent} from './user/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', canActivate: [LoginedGuard],
    children: [
      {path: 'users/:id', component: DetailComponent},
      {path: 'users/:id/update', component: UpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
