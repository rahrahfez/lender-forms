import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private auth: AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  onLogin() {
    const val = this.myForm.value;
    this.auth.login(val.username, val.password);

  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

}
