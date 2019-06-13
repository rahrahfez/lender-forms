import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { ChatComponent } from '../chat/chat.component';

const dashboardRoutes: Routes = [
    { path: '', component: DashboardComponent, children: [
        // { path: '_/:id', component: ChatComponent }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}
