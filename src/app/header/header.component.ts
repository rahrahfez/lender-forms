import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public auth: AuthService) {}



  ngOnInit() {

  }

  registerNewUser() {
    this.router.navigate(['/register']);
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }
}
