import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  myForm: FormGroup;
  
  constructor(private afs: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  async submitFormHandler() {
    const formValue = this.myForm.value;

    try {
      await this.afs.collection('users').add(formValue);
      this.myForm.reset();
      console.log(formValue);
    } catch(err) {
      console.log(err)
    }
  }

  get firstName() {
    return this.myForm.get('firstName');
  } 

  get lastName() {
    return this.myForm.get('lastName');
  }
}
