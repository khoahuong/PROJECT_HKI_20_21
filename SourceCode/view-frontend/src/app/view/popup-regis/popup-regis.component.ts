import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup-regis',
  templateUrl: './popup-regis.component.html',
  styleUrls: ['./popup-regis.component.scss']
})
export class PopupRegisComponent implements OnInit {

  @Input() title: string;
  @Input() placeholder: string;
  event: EventEmitter<any> = new EventEmitter();
  popupForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.popupForm = this.fb.group({
      contentPopup: ['', [
        Validators.required
      ]]
    })
  }

  get f() {
    return this.popupForm.controls
  }

  onConfirm(): void {
    this.submitted = true;
    if (this.popupForm.invalid) {
      this.toastr.error("Hãy nhập đủ nội dung bắt buộc.", "Lỗi");
      return;
    }

    this.event.emit(this.popupForm.controls.contentPopup.value);
    this.bsModalRef.hide();
  }

  onCancel(): void {
    this.bsModalRef.hide();
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

}
