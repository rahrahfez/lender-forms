import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isLoggedIn, isLoggedOut } from './auth/auth.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LenderForms';

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );

    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );
  }
}
