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
    private api: ApiService,
    private fb: FormBuilder,
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
    // todo
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
