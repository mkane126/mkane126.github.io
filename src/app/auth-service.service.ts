import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  signup(email: string, password: string, username: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(cred => {
      const userRef = doc(this.firestore, `users/${cred.user.uid}`);
      return setDoc(userRef, {
        uid: cred.user.uid,
        email: email,
        username: username,
        createdAt: new Date()
      });
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
