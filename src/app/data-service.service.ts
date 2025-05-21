import { Injectable } from '@angular/core';
import { collection, collectionData, where, addDoc, setDoc, doc, getDoc, query as firestoreQuery } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

export interface MatchupSelection {
  username: string
  homeTeam: string;
  awayTeam: string;
  winner: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private firestore: AngularFirestore, private auth: AuthServiceService, private afs: AngularFirestore) { }

  // Add new document with auto ID
  addItem(data: any) {
    return this.firestore.collection('match-selections').add(data);
  }

  addOrUpdateItem(id: string, data: any) {
    return this.firestore.collection('match-selections').doc(id).set(data, { merge: true });
  }

  // Set document with custom ID
  setItem(id: string, data: any) {
    return this.firestore.collection('items').doc(id).set(data);
  }
  // Get document by ID
  getItem(id: string) {
    return this.firestore.collection('items').doc(id).get();
  }

  loadSelections(): Observable<MatchupSelection[]> {
    return this.afs.collection<MatchupSelection>('match-selections', ref =>
      ref.where('username', '==', this.auth.userSubject.getValue()?.email)).valueChanges({ idField: 'id' });
  }
}
