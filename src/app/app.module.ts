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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
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
