import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Login, Logout, Signup } from '../auth/store/auth.actions';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<AppState>
  ) {}

  signUp(email: string, password: string, userDisplayName: string) {
    /**
     * First creates a new user for Firebase with email, password.
     * Then updates the profile to update displayName.
     * Once that is complete, it then creates a new user on the database.
     * Then stores that user in ngrx/store.
     * 
     * TODO: move the api call to an ngrx/effect instead.
     */
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        credential.user
          .updateProfile({
            displayName: userDisplayName
          })
          .then(() => {
            this.afs
              .collection('users')
              .doc(credential.user.uid)
              .set({
                uid: credential.user.uid,
                email: credential.user.email,
                displayName: credential.user.displayName
              });

            this.store.dispatch(
              new Signup({
                uid: credential.user.uid,
                email: credential.user.email,
                displayName: credential.user.displayName
              })
            );
          });
      })
      .catch(err => {
        console.log('Error', err.message);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.store.dispatch(
          new Login({
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: credential.user.displayName
          })
        );
      })
      .catch(() => alert('Login unsuccessful'));
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
