import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-regis-edit-popup',
  templateUrl: './regis-edit-popup.component.html',
  styleUrls: ['./regis-edit-popup.component.scss']
})
export class RegisEditPopupComponent implements OnInit {

  @Input() title: any;
  @Input() item: any;

  event: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;
  submitted: boolean = false;

  nguyenvongXettuyen: FormGroup;

  lstUniversity: any = [];

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.item != null){
      this.bindingDataEdit();
    }
    this.getDmDaihoc();
    this.refreshSelect();
  }

  refreshSelect(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }

  /**
   * khởi tạo form
   */
  buildForm(): void {
    this.nguyenvongXettuyen = this.fb.group({
      thutuNv: ['', [
        Validators.required,
        Validators.maxLength(2),
      ]],
      maTruong: ['', [
        Validators.required
      ]],
      tenNhomnganh: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      maNhomnganh: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      maTohopMonxt: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]]
    })
  }

  get f() { return this.nguyenvongXettuyen.controls };

  /**
   * binding dữ liệu khi sửa
   */
  bindingDataEdit(): void {
    this.nguyenvongXettuyen.controls.thutuNv.setValue(this.item.thutuNv);
    this.nguyenvongXettuyen.controls.maTruong.setValue(this.item.maTruong);
    this.nguyenvongXettuyen.controls.tenNhomnganh.setValue(this.item.tenNhomnganh);
    this.nguyenvongXettuyen.controls.maNhomnganh.setValue(this.item.maNhomnganh);
    this.nguyenvongXettuyen.controls.maTohopMonxt.setValue(this.item.maTohopMonxt);
  }

  /**
   * lấy danh mục trường đại học, cao đẳng
   */
  getDmDaihoc(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DHCD, {}).subscribe(d => {
      this.lstUniversity = d.list;
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục trường đại học, cao đẳng.');
    });
  }

  clickThutuNgVong() {
    let flag = false;
    let thutu = this.nguyenvongXettuyen.controls.thutuNv.value;
    let patternThutu = new RegExp("^[0-9]{1,2}");
    let checkPattern = patternThutu.test(thutu.toString());
    if (checkPattern) {
      let convertThutu = parseFloat(thutu.toString());
      this.nguyenvongXettuyen.controls.thutuNv.setValue(convertThutu);
      $('#thutuChu').hide();
      if (convertThutu == 0) {
        $('#giatriThutu').show();
        flag = true;
      } else {
        $('#giatriThutu').hide();
      }
    } else {
      $('#thutuChu').show();
      flag = true;
    }
    return flag;
  }

  /**
   * đóng popup
   */
  closePopup(): void {
    this.bsModalRef.hide();
  }

  /**
   * hàm thực hiện thêm nguyện vọng xét tuyển
   */
  savePopup(): void {
    this.submitted = true;
    if (this.nguyenvongXettuyen.invalid || this.clickThutuNgVong()) {
      this.toastr.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào.');
      return;
    } else {
      this.loading = true;
      let code = this.nguyenvongXettuyen.controls.maTruong.value;
      let name = _.filter(this.lstUniversity, (d) => {
        return d.maTruongDhcd === code;
      })[0];

      let obj = {
        idExam: this.item != null ? this.item.idExam : null,
        thutuNv: this.nguyenvongXettuyen.controls.thutuNv.value,
        maTruong: code,
        tenTruong: name.tenTruongDhcd,
        maNhomnganh: this.nguyenvongXettuyen.controls.maNhomnganh.value,
        tenNhomnganh: this.nguyenvongXettuyen.controls.tenNhomnganh.value,
        maTohopMonxt: this.nguyenvongXettuyen.controls.maTohopMonxt.value
      }

      this.loading = false;
      this.event.emit(obj);
      this.closePopup();
    }
  }

}
