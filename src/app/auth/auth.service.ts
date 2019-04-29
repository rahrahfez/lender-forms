import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

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
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState;
  }

  signUp(email: string, password: string) {
      this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        val => {
          this.afs.collection('users').add({
            uid: '1',
            email: 'tester@test.com',
            displayName: 'tester'
          })
          console.log(val)
        })
      .catch(
        err => {
          console.log('Error', err.message)
        })
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);

  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
