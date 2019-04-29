import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { 
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule
 } from '@angular/material';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { LoginComponent } from './login/login.component';
import { reducers, metaReducers } from './reducers';
import { routes } from './routes.module';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    SubmitFormComponent,
    LoginComponent,
    DisplayUsersComponent,
    HeaderComponent,
    RegisterComponent,
    ApplicationFormComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    RouterModule.forRoot(routes),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
