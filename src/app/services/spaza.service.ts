import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpazaService {

  constructor(private afs: AngularFirestore) { }

  getSpazas() {
    return this.afs.collection('spazashop').snapshotChanges();
  }
  getSpazasMap() {
    return this.afs.collection('spazashop').valueChanges();
  }
}
