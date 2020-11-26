import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

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
