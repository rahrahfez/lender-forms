import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { Login } from '../auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private afs: AngularFirestore, 
              private fb: FormBuilder, 
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['user1', Validators.required],
      password: ['password', Validators.required]
    })
  }

  onLogin() {
    this.store.dispatch(new Login());
  }

}
