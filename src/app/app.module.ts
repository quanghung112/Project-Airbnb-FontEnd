import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './user/detail/detail.component';
import { HeaderComponent } from './templade/header/header.component';
import { FooterComponent } from './templade/footer/footer.component';
import { SearchComponent } from './templade/search/search.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
<<<<<<< HEAD
=======

>>>>>>> e2f8e5788a8f68a77516ccd514b6b7df1c9c68ab

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HeaderComponent,
    FooterComponent,
<<<<<<< HEAD
    SearchComponent,
=======
    SearchComponent
>>>>>>> e2f8e5788a8f68a77516ccd514b6b7df1c9c68ab
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
<<<<<<< HEAD

=======
>>>>>>> e2f8e5788a8f68a77516ccd514b6b7df1c9c68ab
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
