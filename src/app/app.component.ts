import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nfl-predictions';

  email = '';
  password = '';
  user$ = this.auth.user$;
  showLogin = false;

  currentUser: firebase.User | null = null;

  constructor(public auth: AuthServiceService) {
    this.auth.user$.subscribe((u) => {
      this.currentUser = u;
    });
  }

  signup() {
    this.auth.signup(this.email, this.password)
      .then(() => {
        this.clearForm();
        this.showLogin = false;
      })
  }
  login() {
    this.auth.login(this.email, this.password)
      .then(() => {
        this.clearForm();
        this.showLogin = false;
      })
  }

  logout() {
    this.auth.logout()
    this.showLogin = true
  }

  private clearForm() {
    this.email = '';
    this.password = '';
  }
}
