import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate() {
    if (!this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }

}
