import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailComponent} from './user/detail/detail.component';
import {LoginComponent} from './user/login/login.component';
import {LoginedGuard} from './logined.guard';
import {UpdateComponent} from './user/update/update.component';
import {RegisterComponent} from './user/register/register.component';
import {ChangepasswordComponent} from './user/changepassword/changepassword.component';
import {HeaderComponent} from './templade/header/header.component';
import {SearchComponent} from './templade/search/search.component';
import {AppComponent} from './app.component';
import {FooterComponent} from './templade/footer/footer.component';
import {PostComponent} from './house/post/post.component';
import {PostImageComponent} from './house/post-image/post-image.component';

const routes: Routes = [
  {path: '', component: HeaderComponent, outlet: 'header'},
  {path: '', component: SearchComponent, outlet: 'search'},
  {path: '', component: FooterComponent, outlet: 'footer'},
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', canActivate: [LoginedGuard],
    children: [
      {path: 'me', component: DetailComponent},
      {path: 'me/update', component: UpdateComponent},
      {path: 'me/changePassword', component: ChangepasswordComponent},
      {path: 'me/post/1', component: PostComponent},
      {path: 'me/post/2', component: PostImageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
