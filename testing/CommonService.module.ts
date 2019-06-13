import { NgModule, Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, BehaviorSubject } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService } from 'src/app/services/auth.service';

const fakeAuthState = new BehaviorSubject(null);

const credentialsMock = {
  email: 'user@user.com',
  password: 'password'
};

const userMock = {
  uid: '12345',
  email: credentialsMock.email,
  displayName: 'user'
};

let store: MockStore<{ loggedIn: boolean}>;
const initialState = { loggedIn: false};


const fakeCreateUserHandler = (email, password) => {
  fakeAuthState.next(credentialsMock);
  return Promise.resolve(credentialsMock);
};

const fakeSignInHandler = (email, password) => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const fakeSignOutHandler = () => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

@Injectable()
export class AngularFirestoreStub {
  data = of([
    { firstName: 'test', lastName: 'test' },
    { firstName: 'test1', lastName: 'test2' }
  ]);

  valueChanges() {
    return jasmine.createSpy('valueChanges').and.returnValue(this.data);
  }

  collection() {
    return jasmine.createSpy('collection').and.returnValue(this.valueChanges());
  }
}

@Injectable()
export class AngularFireAuthStub {
  authState = fakeAuthState;

  createUserWithEmailAndPassword(email, password) {
    return jasmine.createSpy('createUserWithEmailAndPassword').and.callFake(fakeCreateUserHandler);
  }

  signInWithEmailAndPassword(email, password) {
    return jasmine.createSpy('signInWithEmailAndPassword').and.callFake(fakeSignInHandler);
  }

  signOut() {
    return jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler);
  }
}

@NgModule({
  providers: [
    { provide: AngularFirestore, useClass: AngularFirestoreStub },
    { provide: AngularFireAuth, useClass: AngularFireAuthStub },
    provideMockStore({ initialState }),
    AuthService
  ],
  imports: [
    RouterTestingModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CommonServiceModule {}
