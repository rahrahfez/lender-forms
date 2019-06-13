import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {
  application$: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.application$ = this.afs.collection('applications').valueChanges();
  }
}
