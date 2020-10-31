import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../common/api/api.service';
import { AuthenticationService } from '../common/grant/authentication.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  submitted: boolean = false;
  subForgot: boolean = false;

  userLoginForm: FormGroup;
  resetPassForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastrService
  ) {
    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['regis/home']);
      return;
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userLoginForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });

    this.resetPassForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  get f() { return this.userLoginForm.controls }
  get fg() { return this.resetPassForm.controls }

  /**
   * function create user
   */
  createUser(): void {
    this.router.navigate(['createUser']); // chuyển sang trang tạo tài khoản
  }

  /**
   * reset password
   */
  forgotPass(): void {
    $('#loginform').slideUp();
    $('#resetform').fadeIn();
  }

  /**
   * function dang nhap he thong
   */
  clickLogin(): void {
    this.submitted = true;
    if (this.userLoginForm.invalid) {
      this.toast.warning('Cảnh báo', 'Kiểm tra lại thông tin đăng nhập.');
      return;
    }

    this.loading = true;
    let userName = this.userLoginForm.controls.username.value;
    let password = this.userLoginForm.controls.password.value;

    const body = new HttpParams()
      .set('username', userName)
      .set('password', password)
      .set('grant_type', 'password');

    this.api.login(body.toString()).subscribe(data => {
      this.authService.authenticate(JSON.stringify(data), userName, password);
      this.loading = false;
    }, error => {
      this.toast.error('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng.');
      this.loading = false;
    });
  }

  /**
   * quay lai màn hình đăng nhập
   */
  backLogin(): void {
    $('#loginform').fadeIn();
    $('#resetform').slideUp();
  }

  /**
   * gui thong tin email dang ky de lay lai mat khau dang nhap
   */
  sendForgotPass(): void {
    // todo
  }
}
