import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {
  userRef = this.afs.collection('users');
  users$: Observable<any>;
  
  constructor(private afs: AngularFirestore, private store: Store<AppState>) { }

  ngOnInit() {
    this.users$ = this.userRef.valueChanges();
  }

}
