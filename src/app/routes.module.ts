import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: 'tasks', component: DisplayUsersComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'application', component: ApplicationFormComponent },
  { path: '', redirectTo: 'application', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class RoutingModule { }
