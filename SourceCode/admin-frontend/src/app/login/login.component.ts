import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../common/api/api.service';
import { AuthenticationService } from '../common/grant/authentication.service';
import { AppService } from '../common/popup/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  submitted: boolean = false;
  namHientai: Date = new Date();
  textTypePass: boolean;
  loginAdminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private app: AppService,
    private api: ApiService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['edu/home']);
      return;
    }
  }

  ngOnInit(): void {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.buildForm();
  }

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

  toggleTextTypePass() {
    this.textTypePass = !this.textTypePass;
  }

  buildForm(): void {
    this.loginAdminForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }

  get f() { return this.loginAdminForm.controls }

  clickLogin(): void {
    this.submitted = true;
    if (this.loginAdminForm.invalid) {
      this.toastr.warning('Kiểm tra lại dữ liệu nhập vào.', 'Cảnh báo');
      this.app.popupAlert('Thông báo', 'Kiểm tra lại dữ liệu nhập vào.');
      return;
    }

    this.loading = true;
    let userName = this.loginAdminForm.controls.username.value;
    let passWord = this.loginAdminForm.controls.password.value;

    let body = new HttpParams()
      .set('username', userName)
      .set('password', passWord)
      .set('grant_type', 'password');

    this.api.login(body.toString()).subscribe(d => {
      this.loading = false;
      this.authService.authenticate(JSON.stringify(d), userName, passWord);
    }, error => {
      this.loading = false;
      this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng.', 'Lỗi');
      this.app.popupAlert('Thông báo', 'Tên đăng nhập hoặc mật khẩu không đúng.');
    })
  }
}
