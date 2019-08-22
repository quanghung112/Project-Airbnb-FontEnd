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

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    LoginComponent,
    UpdateComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
