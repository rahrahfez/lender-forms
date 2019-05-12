import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      // confirmPassword: new FormControl('')
    });
  }

  onRegister() {
    const val = this.registerForm.value;
    this.auth.signUp(val.email, val.password, val.username);
  }
}
