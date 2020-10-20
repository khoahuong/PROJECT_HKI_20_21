import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ApiService } from '../api/api.service';
import { API_CONSTANT } from '../constant/apiConstant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  authenticate(token: string, username: string, password: string) {
    let tk = JSON.parse(token);
    sessionStorage.setItem("access_token", tk.access_token);
    sessionStorage.setItem("token", token);

    //get info userlogin
    //call api
    let userParam = {
      username: username,
      password: password
    }

    this.api.get(API_CONSTANT.API_USER.INFO, userParam).subscribe(data => {
      sessionStorage.setItem("userLogin", JSON.stringify(data.data));
      this.router.navigate(['auth/dashboard']); //todo
    }, error => {
      //todo
    })
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("userLogin");
    return !(user === null);
  }

  getToken(): string {
    return sessionStorage.getItem("access_token");
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  hasRoleRequired(token: string, roleMenus: []): boolean {

    let decoded = jwt_decode(token);
    let roleGranted: [] = decoded.authorities;

    let rs = roleGranted.filter(function (obj) {
      return roleMenus.indexOf(obj) > -1;
    });
    return rs.length > 0;
  }

  getTokenExpirationDate(token: string): Date {
    let decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

}