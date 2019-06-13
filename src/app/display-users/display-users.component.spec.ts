import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUsersComponent } from './display-users.component';
import { CommonServiceModule, AngularFirestoreStub } from 'testing/CommonService.module';
import { SharedModule } from '../shared/shared.module';
import { of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

describe('DisplayUsersComponent', () => {
  let component: DisplayUsersComponent;
  let fixture: ComponentFixture<DisplayUsersComponent>;
  let afs: AngularFirestore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayUsersComponent ],
      imports: [
        CommonServiceModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();

    afs = TestBed.get(AngularFirestoreStub);
  });

  afterEach(() => {
    fixture.destroy();
  });

  xit('application$ should return application objects', async () => {
    component.application$.subscribe((data) => {
      expect(data).toContain({firstName: 'test', lastName: 'test'});
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
