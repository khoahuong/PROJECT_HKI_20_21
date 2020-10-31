import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
declare var $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  loading: boolean = false;
  submitted: boolean = false;

  createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Khởi tạo form createUser
   */
  buildForm(): void {
    this.createUserForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      passWord: ['', [
        Validators.required
      ]],
      rePassWord: ['', [
        Validators.required
      ]],
      soCmnd: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      position: ['', [
        Validators.required
      ]],
      birthday: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  get f() {
    return this.createUserForm.controls
  }

  /**
   * back previous page
   */
  clickBack(): void {
    this.location.back();
  }

  /**
   * function check rePassword, password trung nhau
   */
  checkPassword() {
    let pass = this.createUserForm.controls.passWord.value;
    let rePass = this.createUserForm.controls.rePassWord.value;
    let flag = false;
    if (pass !== rePass && rePass != "") {
      flag = true;
      $('#errorCheckRepass').show();
    } else {
      $('#errorCheckRepass').hide();
    }
    return flag;
  }

  /**
   * function đăng kí tài khoản người dùng
   */
  clickRegis(): void{
    this.submitted = true;
    if (this.createUserForm.invalid || this.checkPassword()) {
      this.toastr.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào.');
      return;
    }

    this.loading = true;
    let objectUser = {
      userName: this.createUserForm.controls.userName.value,
      passWord: this.createUserForm.controls.passWord.value,
      firstName: this.createUserForm.controls.firstName.value,
      lastName: this.createUserForm.controls.lastName.value,
      position: this.createUserForm.controls.position.value,
      birthday: this.createUserForm.controls.birthday.value,
      address: this.createUserForm.controls.address.value,
      phone: this.createUserForm.controls.phone.value,
      email: this.createUserForm.controls.email.value,
      soCmnd: this.createUserForm.controls.soCmnd.value
    }

    this.api.post(API_CONSTANT.API_USER.CREATE_USER, objectUser, {}).subscribe(data => {
      this.loading = false;
      if (data.data === 2) {
        this.toastr.warning('Cảnh báo', 'Tên đăng nhập đã được sử dụng');
        return;
      } else if (data.data === 3) {
        this.toastr.warning('Cảnh báo', 'Email đăng ký đã được sử dụng cho tài khoản khác. Vui lòng nhập email khác.');
        return;
      } else {
        this.toastr.success('Thành công', 'Tạo tài khoản thành công');
        this.router.navigate(['/login']);
      }
    }, error => {
      this.toastr.error('Lỗi', 'Tạo tài khoản không thành công');
      this.loading = false;
    })
  }
}
