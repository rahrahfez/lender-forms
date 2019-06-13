import { NgModule } from '@angular/core';

import { TasksComponent } from '../tasks/tasks.component';
import { DisplayUsersComponent } from '../display-users/display-users.component';
import { ChatComponent } from '../chat/chat.component';
import { DashboardRoutingModule } from './dashboard.routes.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatSidenavModule } from '@angular/material';

@NgModule({
    declarations: [
        DashboardComponent,
        TasksComponent,
        DisplayUsersComponent,
        // ChatComponent,
        SidebarNavComponent,
        UserCardComponent
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        MatSidenavModule
    ]
})
export class DashboardModule { }
