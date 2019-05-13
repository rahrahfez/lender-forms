import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth.service';
import { AppState } from '../reducers';
import * as fromAuth from '../auth/store/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, public auth: AuthService, private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(fromAuth.isLoggedIn);
  }

  registerNewUser() {
    this.router.navigate(['/register']);
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }

  toApplicationForm() {
    this.router.navigate(['/application']);
  }

  logout() {
    this.auth.logout();
  }
}
