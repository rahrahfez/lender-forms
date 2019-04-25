import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { Login } from '../auth/auth.actions';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  user: User;

  constructor(private afs: AngularFirestore, 
              private fb: FormBuilder, 
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  onLogin() {

    this.store.dispatch(new Login(this.user));

    console.log(this.user);
  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

}
