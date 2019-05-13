import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Login, Logout } from '../auth/store/auth.actions';
import { AppState } from '../reducers';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

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
      })
      .catch(err => {
        console.log('Error', err.message);
      });
  }

  login(email: string, password: string) {
    // TODO: Get displayName from userService here <!!!!!>

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.userService.getUserDisplayName(credential.user);
        this.store.dispatch(
          new Login({
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: this.userService.getusername()
          })
        );
      })
      .catch(() => alert('Login unsuccessful'));
  }

  logout() {
    this.store.dispatch(new Logout());
    this.afAuth.auth.signOut();
  }
}
