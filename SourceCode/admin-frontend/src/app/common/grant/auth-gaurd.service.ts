import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import $ from "jquery";

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

    //close popup
    // $('.modal-dialog').modal('hide');

    this.router.navigate(['/login']);
    return false;

  }

}
