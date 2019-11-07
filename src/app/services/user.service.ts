import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  getUsers() {
    return this.afs.collection('users').snapshotChanges();
  }
  getUsersV() {
    return this.afs.collection('users').valueChanges();
  }
  Delete(key) {
    return this.afs.collection('users').doc(key).delete();
  }
}
