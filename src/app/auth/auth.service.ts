import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Login, Logout } from '../auth/auth.actions';
import { AppState } from '../reducers';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
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

    return userRef.set(data);
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
            email: credential.user.email,
            displayName: displayName
          });
        this.store.dispatch(
          new Login({
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: displayName
          })
        );
        this.router.navigate(['/form']);
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
        this.router.navigate(['/form']);
        console.log('Login successful');
      })
      .catch(() => alert('Login unsuccessful'));
  }

  logout() {
    this.store.dispatch(new Logout());
    this.afAuth.auth.signOut();
    alert('Logout successful');
  }
}
