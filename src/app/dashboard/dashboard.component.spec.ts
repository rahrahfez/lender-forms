import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { CommonServiceModule } from 'testing/CommonService.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { DisplayUsersComponent } from '../display-users/display-users.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        SidebarNavComponent,
        DisplayUsersComponent,
        UserCardComponent
      ],
      imports: [
        CommonServiceModule,
        SharedModule,
        MatSidenavModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
