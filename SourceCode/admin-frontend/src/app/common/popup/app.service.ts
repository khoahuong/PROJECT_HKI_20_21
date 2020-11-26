import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { NotifyComponent } from './notify/notify.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  /**
   * hàm tạo popup thông báo
   * @param title
   * @param content
   */
  popupAlert(title: string, content: string): void {
    const initialState = {
      title: title,
      message: content
    }
    this.bsModalRef = this.modalService.show(NotifyComponent, { initialState });
  }

  confirmDialog(title: string, content: string) {
    let flag = false;
    const initialState = {
      title: title,
      message: content
    }
    this.bsModalRef = this.modalService.show(ConfirmComponent, { initialState });
    this.bsModalRef.content.event.subscribe(result => {
      if (result == "OK") {
        flag = true;
      }
    });
    return flag;
  }
}
