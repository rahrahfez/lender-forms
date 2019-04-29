import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { Login } from '../auth/auth.actions';
import { User } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

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
              private store: Store<AppState>,
              private auth: AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  onLogin() {
    const val = this.myForm.value;
    this.auth.login(val.username, val.password)
    .then(
      (user) => {
        this.store.dispatch(new Login(user.user));
        this.router.navigate(['/form'])
        console.log('Login successful')
      }
    )
    .catch(
      () =>
        alert('Login unsuccessful')
    );
  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

}
