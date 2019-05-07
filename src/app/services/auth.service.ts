import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Login, Logout } from '../auth/store/auth.actions';
import { AppState } from '../reducers';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

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
            console.log(user);
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  getUser() {
    return this.user$.pipe(
      first()).toPromise();
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

  signUp(email: string, password: string, displayName?: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.afs
          .collection('users')
          .doc(credential.user.uid)
          .set({
            uid: credential.user.uid,
            email: credential.user.email
          });
        this.store.dispatch(
          new Login({
            uid: credential.user.uid,
            email: credential.user.email
          })
        );
        this.router.navigate(['/tasks']);
      })
      .catch(err => {
        console.log('Error', err.message);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.updateUserData(credential.user);

        this.store.dispatch(
          new Login({ uid: credential.user.uid, email: credential.user.email })
        );
        this.router.navigate(['/tasks']);
      })
      .catch(() => alert('Login unsuccessful'));
  }

  logout() {
    this.store.dispatch(new Logout());
    this.afAuth.auth.signOut();
  }
}
