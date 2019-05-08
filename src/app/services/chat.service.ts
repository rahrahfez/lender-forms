import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { firestore } from 'firebase';
import { Observable, of, combineLatest } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore, private auth: AuthService, private router: Router) { }

  get(chatId: string) {
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  async create() {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['tasks', docRef.id]);
  }

  async sendMessage(chatId: string, content: string) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection('chats').doc(chatId);

      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$
      .pipe(
        switchMap((c): Observable<any> => {
          // unique User IDs
          chat = c;
          const uids = Array.from(new Set(c.messages.map(v => v.uid)));

          // Firestore user doc reads
          const userDocs = uids.map(u =>
            this.afs.doc(`users/${u}`).valueChanges()
          );

          return userDocs.length ? combineLatest(userDocs) : of([]);
        }),
        map(arr => {
          arr.forEach(v => (joinKeys[(v as any).uid] = v));
          chat.messages = chat.messages.map(v => {
            return { ...v, user: joinKeys[v.uid] };
          });

          return chat;
        })
      );
  }
}
