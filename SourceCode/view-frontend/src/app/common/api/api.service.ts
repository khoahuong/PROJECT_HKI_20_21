import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { API_CONSTANT } from '../constant/apiConstant';
import { ToastUltilsService } from '../toast/toast-ultils.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastUltilsService
  ) { }

  /**
   * Login users
   * @param loginLoad
   */
  login(loginLoad: any) {
    const headers = {
      'Authorization': 'Basic ' + btoa('client_id:client_secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(API_CONSTANT.API_ROOT + 'oauth/token', loginLoad, { headers });
  }

  /**
   * function GET no token
   * @param strUrl
   * @param param
   */
  get(strUrl: string, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.get(API_CONSTANT.API_ROOT + strUrl, { headers: headers, params: param, responseType: 'json' });
  }

  /**
   * function POST no token
   * @param strUrl
   * @param paramBody
   * @param param
   */
  post(strUrl: string, paramBody: any, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post(API_CONSTANT.API_ROOT + strUrl, paramBody, { headers: headers, params: param, responseType: 'json' });
  }

  /**
   * upload multi files with no token
   * @param files
   */
  uploadFile(files: any): Observable<any> {
    return this.http.post(API_CONSTANT.API_ROOT + API_CONSTANT.API_FILE.UPLOAD_MULTI_FILES, files);
  }

  /**
   * Check token
   * return true or false
   */
  isGetToken(): boolean {
    let token = sessionStorage.getItem("access_token");
    const date = this.getTokenDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  /**
   * GET token date
   * @param token
   */
  getTokenDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
   * function GET with token
   * @param url
   * @param param
   */
  getDataToken(url: string, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("access_token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    if (!this.isGetToken()) {
      return this.http.get(API_CONSTANT.API_ROOT + url, { headers: headers, params: param, responseType: 'json' });
    } else {
      this.toast.showError('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.', '');
      this.router.navigate(['/login']);
    }
  }

  /**
   * function POST data with token
   * @param url
   * @param Objects
   * @param param
   */
  postDataToken(url: string, Objects: any, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("access_token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    if (!this.isGetToken()) {
      return this.http.post(API_CONSTANT.API_ROOT + url, Objects, { headers: headers, params: param, responseType: 'json' });
    } else {
      this.toast.showError('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.', '');
      this.router.navigate(['/login']);
    }
  }

  /**
   * function PUT data with Token
   * @param url
   */
  put(url: string): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    if (!this.isGetToken()) {
      return this.http.put(API_CONSTANT.API_ROOT + url, null, { headers });
    } else {
      this.toast.showError('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại', '');
      this.router.navigate(['/login']);
    }
  }

  uploadFileToken(files: any): Observable<any> {
    if (!this.isGetToken()) {
      return this.http.post(API_CONSTANT.API_ROOT + API_CONSTANT.API_FILE.UPLOAD_MULTI_FILES, files);
    } else {
      this.toast.showError('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại', '');
      this.router.navigate(['/login']);
    }
  }

  uploadOneFile(file: any): Observable<any> {
    if (!this.isGetToken()) {
      return this.http.post(API_CONSTANT.API_ROOT + API_CONSTANT.API_FILE.UPLOAD_FILE, file);
    } else {
      this.toast.showError('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại', '');
      this.router.navigate(['/login']);
    }
  }

}
