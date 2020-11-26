import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../common/api/api.service';
import { API_CONSTANT } from '../common/constant/apiConstant';
import { CONSTANT } from '../common/constant/constant';
import { AppService } from '../common/popup/app.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  loading: boolean = false;
  namHientai: Date = new Date();
  createUserAdmin: FormGroup;
  submitted: boolean = false;
  textTypePass: boolean;
  lstKhuvucQly: any = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private app: AppService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lstKhuvucQly = CONSTANT.KHUVUC;
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.buildForm();
  }

  ngOnDestroy(): void {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

  /**
   * Hàm khởi tạo form create user
   */
  buildForm(): void {
    this.createUserAdmin = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      passWord: ['', [
        Validators.required,
        Validators.maxLength(512)
      ]],
      isRole: [null, [
        Validators.required
      ]],
      khuvucQuanly: ['', [
        Validators.required
      ]]
    });
  }

  get f() { return this.createUserAdmin.controls }

  createUser(): void {
    this.submitted = true;
    if (this.createUserAdmin.invalid) {
      this.toastr.warning('Kiểm tra lại dữ liệu đầu vào.', 'Cảnh báo');
      this.app.popupAlert('Thông báo', 'Kiểm tra lại dữ liệu đầu vào.');
      return;
    }
    this.loading = true;
    let objectUser = {
      userName: this.createUserAdmin.controls.userName.value,
      passWord: this.createUserAdmin.controls.passWord.value,
      isRole: this.createUserAdmin.controls.isRole.value,
      khuvucQuanly: this.createUserAdmin.controls.khuvucQuanly.value
    }

    this.api.post(API_CONSTANT.USERS.CREATE_USER, objectUser, {}).subscribe(d => {
      this.loading = false;
      if (d.data.success) {
        this.toastr.success(d.data.message, 'Thành công');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error(d.data.message, 'Lỗi');
        this.app.popupAlert('Thông báo', d.data.message);
      }
    }, error => {
      this.toastr.error('Hệ thống đang có lỗi, vui lòng thử lại sau.', 'Lỗi');
      this.loading = false;
    });
  }

  toggleTextTypePass() {
    this.textTypePass = !this.textTypePass;
  }

}
