import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'form', component: SubmitFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];
