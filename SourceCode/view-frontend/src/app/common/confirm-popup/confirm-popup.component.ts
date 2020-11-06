import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  event: EventEmitter<any> = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onCancel(): void {
    this.bsModalRef.hide();
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

}
