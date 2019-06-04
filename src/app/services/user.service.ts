import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { first, switchMap, map, take, tap } from 'rxjs/operators';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';

import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Returns User info from firebase AUTH!! not firestore!!
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    console.log(data);
    return userRef.set(data, { merge: true });
  }

  getUserDisplayName(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);

    try {
      this.subscription = userRef
        .snapshotChanges()
        .subscribe(
          response => console.log(response)
        );
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
