import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../common/api/api.service';
import { API_CONSTANT } from '../common/constant/apiConstant';
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
  subRepass: boolean = false;

  userLoginForm: FormGroup;
  resetPassForm: FormGroup;
  doiMatkhauForm: FormGroup;

  emailRegis: String = "";

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

    this.doiMatkhauForm = this.fb.group({
      newPassword: ['', [
        Validators.required
      ]],
      reNewPassword: ['', [
        Validators.required
      ]],
      confirmCode: ['', [
        Validators.required
      ]]
    })
  }

  get f() { return this.userLoginForm.controls }
  get fg() { return this.resetPassForm.controls }
  get fpass() { return this.doiMatkhauForm.controls }

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
    $('#doimatkhauform').slideUp();
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
      $('#errorInfoLogin').hide();
    }, error => {
      $('#errorInfoLogin').show();
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
    $('#doimatkhauform').slideUp();
  }

  /**
   * gui thong tin email dang ky de lay lai mat khau dang nhap
   */
  sendForgotPass(): void {
    this.subForgot = true;
    if (this.resetPassForm.invalid) {
      this.toast.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào.');
      return;
    }
    this.loading = true;
    let param = {
      email: this.resetPassForm.controls.email.value
    }
    this.api.post(API_CONSTANT.API_USER.GET_CODE_CONFIRM, param, {}).subscribe(data => {
      this.loading = false;
      if (data.success == true) {
        this.emailRegis = param.email;
        $('#doimatkhauform').fadeIn();
        $('#loginform').slideUp();
        $('#resetform').slideUp();
      } else {
        this.toast.warning('Cảnh báo', 'Email dùng để đăng ký tài khoản không chính xác.');
      }
    }, error => {
      this.loading = false;
      this.toast.error('Lỗi', 'Hệ thống đang xảy lỗi. Vui lòng thử lại sau.');
    })

  }

  /**
   * function check rePassword, password trung nhau
   */
  checkPassword() {
    let flag = false;
    let pass = this.doiMatkhauForm.controls.newPassword.value;
    let rePass = this.doiMatkhauForm.controls.reNewPassword.value;
    if (pass !== rePass && rePass != "") {
      flag = true;
      $('#errorResetRepass').show();
    } else {
      $('#errorResetRepass').hide();
    }
    return flag;
  }

  /**
   * ham doi mat khau khi quen mat khau
   */
  replacePassword(): void {
    this.subRepass = true;
    if (this.doiMatkhauForm.invalid || this.checkPassword()) {
      this.toast.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào');
      return;
    }

    this.loading = true;
    let bodyParam = {
      email: this.emailRegis,
      newPassword: this.doiMatkhauForm.controls.newPassword.value,
      confirmCode: this.doiMatkhauForm.controls.confirmCode.value
    }

    this.api.post(API_CONSTANT.API_USER.RE_PASSWORD, bodyParam, {}).subscribe(data => {
      this.loading = false;
      if (data.data === 1) {
        this.toast.success('Thành công', 'Đổi mật khẩu thành công');
        this.backLogin();
        $('#errorNotPassTimeCode').hide();
        $('#errorNotCodeConfirm').hide();
      } else if (data.data === 2) {
        this.toast.warning('Cảnh báo', 'Thời gian hiệu lực của mã xác nhận đã quá 10 phút');
        $('#errorNotPassTimeCode').show();
        $('#errorNotCodeConfirm').hide();
        return;
      } else if (data.data === 3) {
        this.toast.warning('Cảnh báo', 'Mã xác nhận không trùng khớp.');
        $('#errorNotPassTimeCode').hide();
        $('#errorNotCodeConfirm').show();
        return;
      } else {
        this.toast.error('Lỗi', 'Đổi mật khẩu không thành công.');
        $('#errorNotPassTimeCode').hide();
        $('#errorNotCodeConfirm').hide();
      }
    }, error => {
      this.toast.error('Lỗi', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.loading = false;
    })
  }
}
