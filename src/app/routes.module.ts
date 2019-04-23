import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'form', component: SubmitFormComponent }
]