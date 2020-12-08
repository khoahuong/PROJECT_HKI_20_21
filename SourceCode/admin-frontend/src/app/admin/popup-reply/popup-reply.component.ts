import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';

@Component({
  selector: 'app-popup-reply',
  templateUrl: './popup-reply.component.html',
  styleUrls: ['./popup-reply.component.scss']
})
export class PopupReplyComponent implements OnInit {

  @Input() title: string;
  @Input() placeholder: string;
  @Input() idHoso: any;
  @Input() maTrangthai: any;
  @Input() maHoso: any;
  event: EventEmitter<any> = new EventEmitter();
  popupConfirmForm: FormGroup;
  lydo: any;
  submitted: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getLydo();
  }

  buildForm(): void {
    this.popupConfirmForm = this.fb.group({
      contentPopup: ['', [
        Validators.required
      ]]
    })
  }

  getLydo(): void {
    let params = {
      idHoso: this.idHoso !== "" ? this.idHoso : null,
      maTrangthai: this.maTrangthai !== "" ? this.maTrangthai : null
    }

    this.api.getDataToken(API_CONSTANT.REGIS_CONTENT.GET_DATA, params).subscribe(d => {
      if (d.data !== null) {
        this.lydo = d.data.noidungYeucau;
      }
    }, error => {
      this.toastr.error('Hệ thống đang có lỗi, vui lòng thử lại sau.', 'Lỗi');
    })
  }

  get f() {
    return this.popupConfirmForm.controls
  }

  // đồng ý
  onConfirm(): void {
    let obj = {
      typeConfirm: CONSTANT.TYPE_CONFIRM.OK,
      noidung: this.popupConfirmForm.controls.contentPopup.value
    }
    this.event.emit(obj);
    this.bsModalRef.hide();
  }

  // từ chối
  tuchoiXinsua(): void {
    this.submitted = true;
    if (this.popupConfirmForm.invalid) {
      this.toastr.error("Hãy nhập đủ nội dung bắt buộc.", "Lỗi");
      return;
    }

    let obj = {
      typeConfirm: CONSTANT.TYPE_CONFIRM.NOT_OK,
      noidung: this.popupConfirmForm.controls.contentPopup.value
    }
    this.event.emit(obj);
    this.bsModalRef.hide();

  }

  onCancel(): void {
    this.bsModalRef.hide();
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

}
