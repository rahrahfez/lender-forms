import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {
  applicationRef = this.afs.collection('applications');
  application$: Observable<any>;

  constructor(private afs: AngularFirestore, private router: Router, private cs: ChatService) { }

  ngOnInit() {
    this.application$ = this.applicationRef.valueChanges();
  }

  onClick() {
    
  }
}
