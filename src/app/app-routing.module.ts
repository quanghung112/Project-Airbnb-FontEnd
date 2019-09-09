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
import {ShowhousesComponent} from './house/showhouses/showhouses.component';
import {PostComponent} from './house/post/post.component';
import {PostImageComponent} from './house/post-image/post-image.component';
import {HouseDetailsComponent} from './house/house-details/house-details.component';
import {ListComponent} from './house/list/list.component';
import {UpdatePostComponent} from './house/update-post/update-post.component';
import {SearchListComponent} from './house/search-list/search-list.component';
import {OlderHouseComponent} from './Order/older-house/older-house.component';
import {ListOrderComponent} from './Order/list-order/list-order.component';
import {ListUserOrderComponent} from './Order/list-user-order/list-user-order.component';



const routes: Routes = [
  {path: '', component: HeaderComponent, outlet: 'header'},
  {path: '', component: SearchComponent, outlet: 'search'},
  {path: '', component: FooterComponent, outlet: 'footer'},
  {path: '', component: ShowhousesComponent},
  {
    path: '', canActivate: [LoginedGuard],
    children: [
      {path: 'me', component: DetailComponent},
      {path: 'me/update', component: UpdateComponent},
      {path: 'me/changePassword', component: ChangepasswordComponent},
      {path: 'me/post', component: PostComponent},
      {path: 'me/post/2', component: PostImageComponent},
      {path: 'me/posts/list', component: ListComponent},
      {path: 'me/posts/list/:id/user_order', component: ListUserOrderComponent},
      {path: 'me/posts/list/:id/update', component: UpdatePostComponent},
      {path: 'order/houses/:id', component: OlderHouseComponent},
      {path: 'me/order/list', component: ListOrderComponent}
    ]
  },
  {path: 'houses', component: ShowhousesComponent},
  {path: 'houses/search', component: SearchListComponent},
  {path: 'houses/:id', component: HouseDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
