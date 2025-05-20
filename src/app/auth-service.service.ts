import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public userSubject = new BehaviorSubject<firebase.User | null>(null);
  public user$: Observable<firebase.User | null> = this.userSubject.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    // Subscribe to Firebase auth changes
    this.afAuth.authState.subscribe((user) => {
      this.userSubject.next(user); // Updates app-wide user info
    });
  }

  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  // Optional helper to get latest user snapshot (non-observable)
  get currentUser(): firebase.User | null {
    return this.userSubject.value;
  }
}
