import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './user/detail/detail.component';
import { HeaderComponent } from './templade/header/header.component';
import { FooterComponent } from './templade/footer/footer.component';
import { SearchComponent } from './templade/search/search.component';
import { LoginComponent } from './user/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TokenInterceptor} from './interceptors/token.interceptor';
import { UpdateComponent } from './user/update/update.component';
import { RegisterComponent } from './user/register/register.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {getAuthServiceConfigs} from './socialloginConfig';
import { ContentComponent } from './templade/content/content.component';
import { HomeComponent } from './templade/home/home.component';
import { ShowhousesComponent } from './house/showhouses/showhouses.component';
import { PostComponent } from './house/post/post.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { HouseDetailsComponent } from './house/house-details/house-details.component';
import { PostImageComponent } from './house/post-image/post-image.component';
import { ListComponent } from './house/list/list.component';
import { UpdatePostComponent } from './house/update-post/update-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { SearchListComponent } from './house/search-list/search-list.component';
import { OlderHouseComponent } from './Order/older-house/older-house.component';
import { ListOrderComponent } from './Order/list-order/list-order.component';
import { ListUserOrderComponent } from './Order/list-user-order/list-user-order.component';
import {RevenueComponent} from './Order/revenue/revenue.component';
import {DatePipe} from '@angular/common';
import { CommentComponent } from './house/comment/comment.component';
import { UserDetailInPostComponent } from './house/user-detail-in-post/user-detail-in-post.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    LoginComponent,
    UpdateComponent,
    RegisterComponent,
    ChangepasswordComponent,
    ContentComponent,
    HomeComponent,
    ShowhousesComponent,
    PostComponent,
    PostImageComponent,
    HouseDetailsComponent,
    ListComponent,
    UpdatePostComponent,
    SearchListComponent,
    OlderHouseComponent,
    ListOrderComponent,
    ListUserOrderComponent,
    RevenueComponent,
    CommentComponent,
    UserDetailInPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    CKEditorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent]
})
export class AppModule {

}
