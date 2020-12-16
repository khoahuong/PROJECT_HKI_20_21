import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { TableRegisContentDomain } from 'src/app/model/TableRegisContentDomain';

@Component({
  selector: 'app-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss']
})
export class PopupInfoComponent implements OnInit {

  @Input() title: string;
  @Input() idHoso: any;
  @Input() maTrangthai: any;
  contentRep: TableRegisContentDomain = new TableRegisContentDomain();
  constructor(
    public bsModalRef: BsModalRef,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDataContent();
  }

  getDataContent(): void {
    let params = {
      idHoso: this.idHoso !== "" ? this.idHoso : null,
      maTrangthai: this.maTrangthai !== "" ? this.maTrangthai : null
    }
    this.api.getDataToken(API_CONSTANT.REGIS_CONTENT.GET_DATA, params).subscribe(d => {
      if (d.data !== null) {
        this.contentRep = d.data;
      }
    }, error => {
      this.toastr.error('Hệ thống đang có lỗi, vui lòng thử lại sau.', 'Lỗi');
    })
  }

  onCancel(): void {
    this.bsModalRef.hide();
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

}
