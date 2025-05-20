import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nfl-predictions';

  username = '';
  email = '';
  password = '';
  user$ = this.auth.user$;

  constructor(public auth: AuthServiceService) { }

  signup() {
    this.auth.signup(this.email, this.password, this.username)
      .then(() => {
        this.clearForm();
      })
  }
  login() {
    this.auth.login(this.email, this.password)
      .then(() => {
        this.clearForm();
      })
  }

  logout() {
    this.auth.logout()
  }

  private clearForm() {
    this.email = '';
    this.password = '';
    this.username = '';
  }
}
