import { NgModule } from '@angular/core';

import { TasksComponent } from '../tasks/tasks.component';
import { DisplayUsersComponent } from '../display-users/display-users.component';
import { ChatComponent } from '../chat/chat.component';
import { DashboardRoutingModule } from './dashboard.routes.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';

@NgModule({
    declarations: [
        DashboardComponent,
        TasksComponent,
        DisplayUsersComponent,
        ChatComponent,
        SidebarNavComponent
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
