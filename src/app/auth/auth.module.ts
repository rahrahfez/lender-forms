import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routes.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
