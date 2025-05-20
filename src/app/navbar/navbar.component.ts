import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() currentUser: firebase.User | null = null;

  constructor(public authService: AuthServiceService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  @Output() showLoginForm = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();

  onLoginClick() {
    this.showLoginForm.emit();
  }

  onSignOutClick() {
    this.signOut.emit();
  }
}