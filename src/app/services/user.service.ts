import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, switchMap, map } from 'rxjs/operators';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';

import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<User>;
  userRef: AngularFirestoreDocument<User>;
  username: string;

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

  get(userId: string) {
    return this.afs
      .collection<User>('users')
      .doc(userId)
      .snapshotChanges()
      .pipe(
        map(
          (val) => {
            return val.payload.get('displayName');
          }
        )
      );
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  getusername(): string {
    if (this.username) {
      return this.username;
    } else {
      return 'no username was found';
    }
  }

  updateUserData(user: User) {
    this.userRef = this.afs.doc<User>(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return this.userRef.set(data, { merge: true });
  }

  async getUserDisplayName(user: User) {
    this.userRef = this.afs.doc<User>(`user/${user.uid}`);
    try {
      await this.userRef
        .valueChanges()
        .toPromise()
        .then(
          val => {
            this.username = val.displayName;
            console.log(this.username);
          }
        );
    } catch (err) {
      console.log(err);
    }
  }
}
