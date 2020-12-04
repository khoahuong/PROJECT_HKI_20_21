import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

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

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.popupForm = this.fb.group({
      contentPopup: ['']
    })
  }

  onConfirm(): void {
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
