import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ApplicationFormComponent } from './application-form/application-form.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  { path: 'application', component: ApplicationFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
