import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
declare var $: any;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() idForm: number;
  @Input() infoUser: any;
  @Input() title: any;

  event: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;
  submitted: boolean = false;
  subRepass: boolean = false;
  isReadOnly: boolean = true;

  userInfoForm: FormGroup;
  replacePassForm: FormGroup;

  fieldTextType: boolean;
  fieldTextTypeNewPass: boolean;
  fieldTextTypeReNewPass: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.idForm == 1) {
      $('#editInfo').show();
      $('#userInfo').fadeIn();
      $('#replacePass').slideUp();
      $('#showDateKick').hide();
      this.bindingDataUserInfo();
    } else if (this.idForm == 2) {
      $('#updatePass').show();
      $('#userInfo').slideUp();
      $('#replacePass').fadeIn();
    } else {
      $('#userInfo').slideUp();
      $('#replacePass').slideUp();
    }
  }

  /**
   * binding data
   */
  bindingDataUserInfo(): void {
    this.userInfoForm.controls.userName.setValue(this.infoUser.userName);
    this.userInfoForm.controls.soCmnd.setValue(this.infoUser.soCmnd);
    this.userInfoForm.controls.firstName.setValue(this.infoUser.firstName);
    this.userInfoForm.controls.lastName.setValue(this.infoUser.lastName);
    this.userInfoForm.controls.position.setValue(this.infoUser.position);
    this.userInfoForm.controls.birthday.setValue(new Date(this.infoUser.birthday));
    this.userInfoForm.controls.address.setValue(this.infoUser.address);
    this.userInfoForm.controls.phone.setValue(this.infoUser.phone);
    this.userInfoForm.controls.email.setValue(this.infoUser.email);
  }

  buildForm(): void {
    this.userInfoForm = this.fb.group({
      userName: [''],
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

    this.replacePassForm = this.fb.group({
      password: ['', [
        Validators.required
      ]],
      newPassword: ['', [
        Validators.required
      ]],
      reNewPassword: ['', [
        Validators.required
      ]]
    });
  }

  get f() { return this.userInfoForm.controls };
  get fpass() { return this.replacePassForm.controls };

  /**
   * hàm đóng popup
   */
  close(): void {
    this.bsModalRef.hide();
  }

  /**
   * chuyen doi trang thai tu xem thong tin ho so sang chinh sua ho so
   */
  editInfo(): void {
    $('#showDateKick').show();
    $('#editInfo').hide();
    $('#saveInfo').show();
    this.isReadOnly = false;
  }

  /**
   * hàm cập nhật thông tin tài khoản người dùng
   */
  saveOrUpdateInfo(): void {
    this.submitted = true;
    if (this.userInfoForm.invalid) {
      this.toastr.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào.');
      return;
    }

    this.loading = true;
    let userObject = {
      id: this.infoUser.id,
      userName: this.infoUser.userName,
      firstName: this.userInfoForm.controls.firstName.value,
      lastName: this.userInfoForm.controls.lastName.value,
      position: this.userInfoForm.controls.position.value,
      birthday: this.userInfoForm.controls.birthday.value,
      address: this.userInfoForm.controls.address.value,
      phone: this.userInfoForm.controls.phone.value,
      email: this.userInfoForm.controls.email.value,
      soCmnd: this.userInfoForm.controls.soCmnd.value
    }

    this.api.postDataToken(API_CONSTANT.API_USER.UPDATE_USER, userObject, {}).subscribe(data => {
      this.loading = false;
      switch (data.data) {
        case 0: {
          this.toastr.success('Thành công', 'Cập nhật thông tin tài khoản người dùng thành công.');
          this.event.emit('OK');
          this.close();
          break;
        }
        case 1: {
          this.toastr.warning('Cảnh báo', 'Bạn đang cố gắng thay đổi thông tin không phải tài khoản của bạn.');
          break;
        }
        case 2: {
          this.toastr.warning('Cảnh báo', 'Email đã được sử dụng.');
          break;
        }
        case 3: {
          this.toastr.warning('Cảnh báo', 'Số CMND/CCCD đã được sử dụng.');
          break;
        }
        default: {
          this.toastr.error('Lỗi', 'Cập nhật thông tin tài khoản không thành công.');
          break;
        }
      }
    }, error => {
      this.toastr.error('Lỗi', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.loading = false;
    })
  }

  /**
   * hàm update mật khẩu
   */
  updatePassword(): void {
    this.subRepass = true;
    if (this.replacePassForm.invalid || this.checkPassword()) {
      this.toastr.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào.');
      return;
    }

    this.loading = true;
    let bodyParam = {
      id: this.infoUser.id,
      password: this.replacePassForm.controls.password.value,
      newPassword: this.replacePassForm.controls.newPassword.value
    }

    this.api.postDataToken(API_CONSTANT.API_USER.API_RE_PASS, bodyParam, {}).subscribe(data => {
      this.loading = false;
      switch (data.data) {
        case 0: {
          this.toastr.success('Thành công', 'Cập nhật mật khẩu thành công.');
          this.event.emit('OK');
          this.close();
          break;
        }
        case 1: {
          this.toastr.warning('Cảnh báo', 'Bạn đang cố thay đổi thông tin không phải tài khoản của bạn.');
          break;
        }
        case 2: {
          this.toastr.warning('Cảnh báo', 'Mật khẩu cũ không chính xác.');
          break;
        }
        default: {
          this.toastr.error('Lỗi', 'Cập nhật mật khẩu không thành công.');
          break;
        }
      }
    }, error => {
      this.toastr.error('Lỗi', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.loading = false;
    });

  }

  /**
   * hàm check trùng mật khẩu nhập vào
   */
  checkPassword() {
    let flag = false;
    let pass = this.replacePassForm.controls.newPassword.value;
    let rePass = this.replacePassForm.controls.reNewPassword.value;
    if (pass !== rePass && rePass != "") {
      flag = true;
      $('#errorResetRepass').show();
    } else {
      $('#errorResetRepass').hide();
    }
    return flag;
  }

  // show - hide password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextTypeNewPass() {
    this.fieldTextTypeNewPass = !this.fieldTextTypeNewPass;
  }

  toggleFieldTextTypeReNewPass() {
    this.fieldTextTypeReNewPass = !this.fieldTextTypeReNewPass;
  }

}
