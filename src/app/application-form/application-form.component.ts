import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
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
    { value: 'North Carolina', viewValue: 'NC' },
    { value: 'South Carolina', viewValue: 'SC' },
    { value: 'California', viewValue: 'CA' },
    { value: 'Alabama', viewValue: 'AL'},
    { value: 'Alaska', viewValue: 'AK'},
    { value: 'Arizona', viewValue: 'AZ'},
    { value: 'Arkansas', viewValue: 'AR'},
    { value: 'Colorado', viewValue: 'CO'},
    { value: 'Connecticut', viewValue: 'CT'},
    { value: 'Delaware', viewValue: 'DE'},
    { value: 'Florida', viewValue: 'FL'},
    { value: 'Georgia', viewValue: 'GA'},
    { value: 'Hawaii', viewValue: 'HI'},
    { value: 'Idaho', viewValue: 'ID'},
    { value: 'Iowa', viewValue: 'IA'},
    { value: 'Illinois', viewValue: 'IL'},
    { value: 'Indiana', viewValue: 'IN'},
    { value: 'Kansas', viewValue: 'KS'},
    { value: 'Kentucky', viewValue: 'KY'},
    { value: 'Louisiana', viewValue: 'LA'},
    { value: 'Maine', viewValue: 'ME'},
    { value: 'Maryland', viewValue: 'MD'},
    { value: 'Massachusetts', viewValue: 'MA'},
    { value: 'Michigan', viewValue: 'MI'},
    { value: 'Minnesota', viewValue: 'MN'},
    { value: 'Mississippi', viewValue: 'MS'},
    { value: 'Missouri', viewValue: 'MO'},
    { value: 'Montana', viewValue: 'MT'},
    { value: 'Nebraska', viewValue: 'NE'},
    { value: 'Nevada', viewValue: 'NV'},
    { value: 'New Hampsire', viewValue: 'NH'},
    { value: 'New Jersey', viewValue: 'NJ'},
    { value: 'New Mexico', viewValue: 'NM'},
    { value: 'New York', viewValue: 'NY'},
    { value: 'North Dakota', viewValue: 'ND'},
    { value: 'Ohio', viewValue: 'OH'},
    { value: 'Oklahoma', viewValue: 'OK'},
    { value: 'Oregon', viewValue: 'OR'},
    { value: 'Pennsylvania', viewValue: 'PA'},
    { value: 'Rhode Island', viewValue: 'RI'},
    { value: 'South Dakota', viewValue: 'SD'},
    { value: 'Tennessee', viewValue: 'TN'},
    { value: 'Texas', viewValue: 'TX'},
    { value: 'Utah', viewValue: 'UT'},
    { value: 'Vermont', viewValue: 'VT'},
    { value: 'Virginia', viewValue: 'VA'},
    { value: 'Washington', viewValue: 'WA'},
    { value: 'West Virginia', viewValue: 'WV'},
    { value: 'Wisonsin', viewValue: 'WI'},
    { value: 'Wyoming', viewValue: 'WY'}
  ];

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit() {
    this.applicationForm = this.fb.group({
      date: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern('^[0-9]*$')
      ]]
    });
  }

  submitFormHandler() {
    const formValue = this.applicationForm.value;
    if (this.applicationForm.valid) {
      try {
        this.afs.collection('applications').add(formValue);
        this.applicationForm.reset();
        alert('Form Submitted');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
