import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ParseToken } from 'src/app/model/ParseToken';
import { API_CONSTANT } from '../constant/apiConstant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  decoded: ParseToken = new ParseToken();
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // đăng nhập chương trình quản trị hệ thống
  login(loginLoad: any) {
    const headers = {
      'Authorization': 'Basic ' + btoa('client_id:client_secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(API_CONSTANT.API_ROOT + 'oauth/token', loginLoad, { headers });
  }

  // phương thức GET không qua token đăng nhập hệ thống
  get(strUrl: string, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.get(API_CONSTANT.API_ROOT + strUrl, { headers: headers, params: param, responseType: 'json' });
  }

  // phương thức POST không qua token đăng nhập hệ thống
  post(strUrl: string, paramBody: any, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post(API_CONSTANT.API_ROOT + strUrl, paramBody, { headers: headers, params: param, responseType: 'json' });
  }

  // check hieu luc cua token con hay khong
  isGetToken(): boolean {
    let token = sessionStorage.getItem("access_token");
    const date = this.getTokenDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  // trả về thời gian hiệu lực
  getTokenDate(token: string): Date {
    this.decoded = jwt_decode(token);
    if (this.decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(this.decoded.exp);
    return date;
  }

  // phương thức GET qua token
  getDataToken(url: string, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("access_token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    if (!this.isGetToken()) {
      return this.http.get(API_CONSTANT.API_ROOT + url, { headers: headers, params: param, responseType: 'json' });
    } else {
      this.toastr.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.', 'Lỗi');
      this.router.navigate(['/login']);
    }
  }

  // phương thức POST qua token
  postDataToken(url: string, Objects: any, param: any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("access_token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    if (!this.isGetToken()) {
      return this.http.post(API_CONSTANT.API_ROOT + url, Objects, { headers: headers, params: param, responseType: 'json' });
    } else {
      this.toastr.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.', 'Lỗi');
      this.router.navigate(['/login']);
    }
  }

  // upload nhiều files thông qua token
  uploadFilesToken(files: any): Observable<any> {
    if (!this.isGetToken()) {
      return this.http.post(API_CONSTANT.API_ROOT + API_CONSTANT.API_FILE.UPLOAD_MULTI_FILES, files);
    } else {
      this.toastr.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại', 'Lỗi');
      this.router.navigate(['/login']);
    }
  }

  // upload 1 file qua token
  uploadOneFile(file: any): Observable<any> {
    if (!this.isGetToken()) {
      return this.http.post(API_CONSTANT.API_ROOT + API_CONSTANT.API_FILE.UPLOAD_FILE, file);
    } else {
      this.toastr.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại', 'Lỗi');
      this.router.navigate(['/login']);
    }
  }

  /**
   * hàm thực hiện download file
   * @param filePath
   */
  downloadFile(filePath: any): any {
    if (!this.isGetToken()) {
      return this.http.get(API_CONSTANT.API_ROOT + API_CONSTANT.API_FILE.DOWNLOAD, { params: filePath, responseType: 'blob' });
    } else {
      this.toastr.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại', 'Lỗi');
      this.router.navigate(['/login']);
    }
  }
}
