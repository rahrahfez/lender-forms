import { NgModule, Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Injectable()
export class AngularFirestoreStub {}

@NgModule({
  providers: [
    { provide: AngularFirestore, useClass: AngularFirestoreStub }
  ],
  imports: [
    RouterTestingModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CommonServiceModule {}
