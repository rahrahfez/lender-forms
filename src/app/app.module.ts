import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './reducers';
import * as fromAuth from './auth/store/auth.reducer';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routes.module';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { AuthEffects } from './auth/store/auth.effects';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user.service';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApplicationFormComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    AuthService,
    ChatService,
    UserService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
