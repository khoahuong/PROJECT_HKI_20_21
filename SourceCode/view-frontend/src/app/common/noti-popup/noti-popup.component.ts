import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-noti-popup',
  templateUrl: './noti-popup.component.html',
  styleUrls: ['./noti-popup.component.scss']
})
export class NotiPopupComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  closeNotiPopup(): void {
    this.modalRef.hide();
  }
}
