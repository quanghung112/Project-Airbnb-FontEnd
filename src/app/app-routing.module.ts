
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailComponent} from './user/detail/detail.component';
<<<<<<< HEAD
import {LoginComponent} from './login/login.component';
const routes: Routes = [
  { path: 'users/:id', component : DetailComponent},
  {path: 'login', component: LoginComponent}
];

=======
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'users/:id', component : DetailComponent},
   {path: 'login', component: LoginComponent}
  ]
>>>>>>> e2f8e5788a8f68a77516ccd514b6b7df1c9c68ab
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
