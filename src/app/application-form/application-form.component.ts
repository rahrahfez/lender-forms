import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

export interface States {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  states: States[] = [
    { value: 'nc', viewValue: 'NC' },
    { value: 'sc', viewValue: 'SC' },
    { value: 'ca', viewValue: 'CA' }
  ];

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit() {
    this.applicationForm = this.fb.group({
      date: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      zipcode: ['']
    });
  }

  async submitFormHandler() {
    const formValue = this.applicationForm.value;

    try {
      await this.afs.collection('applications').add(formValue);
      this.applicationForm.reset();
      alert('Form Submitted');
    } catch (err) {
      console.log(err);
    }
  }
}
