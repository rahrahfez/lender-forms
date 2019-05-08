import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Login, Logout } from '../auth/store/auth.actions';
import { AppState } from '../reducers';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.user$ = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  getUser() {
    return this.user$
    .pipe(
      first()
      )
      .toPromise();
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    return userRef.set(data, { merge: true });
  }

  getUserDisplayName(user: User): string {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    let displayName = '';

    this.subscription = userRef.get()
      .subscribe(val => displayName = val.get('displayName'));

    return displayName;
  }

  signUp(email: string, password: string, userDisplayName: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.afs
          .collection('users')
          .doc(credential.user.uid)
          .set({
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: userDisplayName
          });
        this.store.dispatch(
          new Login({
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: userDisplayName
          })
        );
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        console.log('Error', err.message);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        // this.updateUserData(credential.user);

        this.store.dispatch(
          new Login({
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: this.getUserDisplayName(credential.user)
          })
        );
        this.router.navigate(['/dashboard']);
      })
      .catch(() => alert('Login unsuccessful'));
  }

  logout() {
    this.store.dispatch(new Logout());
    this.afAuth.auth.signOut();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
