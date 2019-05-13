import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromAuth from '../auth/store/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$: Observable<User>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }

}
