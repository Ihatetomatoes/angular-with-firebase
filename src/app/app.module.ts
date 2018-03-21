import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './navbar/navbar.component';
import { MobxAngularModule } from 'mobx-angular';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MobxAngularModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
