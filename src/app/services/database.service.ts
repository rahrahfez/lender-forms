import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore) { }

  getApplications() {
    return this.afs.collection('applications').valueChanges();
  }
}
