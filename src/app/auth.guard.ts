import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthServiceService) {
    console.log('AuthGuard instantiated');
  }

  // This should check if user is logged in
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    const isLoggedIn = this.auth.userSubject.getValue()
    console.log(isLoggedIn)

    if (isLoggedIn) {
      return true;
    } else {
      // Redirect to home or login page if not logged in
      return this.router.parseUrl('/');
    }
  }
}