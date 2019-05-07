import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { reducers, metaReducers } from './reducers';
import { RoutingModule } from './routes.module';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { HeaderComponent } from './header/header.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ChatComponent } from './chat/chat.component';
import * as fromAuth from './auth/store/auth.reducer';
import { TasksComponent } from './tasks/tasks.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AuthRoutingModule } from './auth/auth-routes.module';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    SubmitFormComponent,
    DisplayUsersComponent,
    HeaderComponent,
    ApplicationFormComponent,
    ChatComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.config),
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    AuthRoutingModule,
    RoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    AuthService,
    ChatService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
