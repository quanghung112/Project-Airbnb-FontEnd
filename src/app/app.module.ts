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
import {FormsModule} from '@angular/forms';
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
// import { UploadFileComponent } from './upload-file/upload-file.component';
import { PostImageComponent } from './house/post-image/post-image.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { HouseDetailsComponent } from './house/house-details/house-details.component';


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
    JwPaginationComponent,
    HouseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    CKEditorModule,
    NgxPaginationModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
