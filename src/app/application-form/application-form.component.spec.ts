import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ApplicationFormComponent } from './application-form.component';
import { SharedModule } from '../shared/shared.module';
import { CommonServiceModule } from 'testing/CommonService.module';

describe('ApplicationFormComponent', () => {
  let component: ApplicationFormComponent;
  let fixture: ComponentFixture<ApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ApplicationFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        CommonServiceModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.applicationForm.valid).toBeFalsy();
  });

  it('first name field validity', () => {
    let errors = {};
    const firstName = component.applicationForm.controls.firstName;
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('zipcode should contain 5 numbers', () => {
    let errors = {};
    const zipcode = component.applicationForm.controls['zipcode'];
    errors = zipcode.errors || {};
    zipcode.setValue('12234');
    expect(zipcode.valid).toBeTruthy();
  });

  it('should submit form when valid', () => {
    expect(component.applicationForm.valid).toBeFalsy();

    component.applicationForm.controls.date.setValue('12345');
    component.applicationForm.controls.firstName.setValue('test');
    component.applicationForm.controls.lastName.setValue('test');
    component.applicationForm.controls.address.setValue('test');
    component.applicationForm.controls.city.setValue('test');
    component.applicationForm.controls.state.setValue('test');
    component.applicationForm.controls.zipcode.setValue('12345');

    component.submitFormHandler();
    expect(component.applicationForm.valid).toBeTruthy();
  });
});
