import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ParseToken } from 'src/app/model/ParseToken';
import { ApiService } from '../api/api.service';
import { API_CONSTANT } from '../constant/apiConstant';
import * as lodash from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  bsModalRef: BsModalRef;

  decoded: ParseToken = new ParseToken();
  constructor(
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService
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
    this.api.getDataToken(API_CONSTANT.USERS.GET_INFO_USER, userParam).subscribe(data => {
      if (data.data !== null) {
        sessionStorage.setItem("userLogin", JSON.stringify(data.data));
        this.router.navigate(['edu/home']);
      } else {
        this.toastr.error('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng.');
        this.router.navigate(['/login']);
        this.bsModalRef.hide();
      }
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
    if (date === null) return true;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
    this.decoded = jwt_decode(token);
    let lstAuthor = this.decoded.authorities;
    let filterLstAuthor = lstAuthor !== null && lstAuthor.length > 0 ? lodash.filter(lstAuthor, (d) => {
      return d !== '1';
    }) : [];
    if (filterLstAuthor.length === 0) return null; // check quyen tai khoan
    if (this.decoded.exp === undefined) return null; // check thoi han token
    const date = new Date(0);
    date.setUTCSeconds(this.decoded.exp);
    return date;
  }

}
