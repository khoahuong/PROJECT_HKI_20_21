import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';
import { HistoryRegisComponent } from '../history-regis/history-regis.component';
import { PopupReplyComponent } from '../popup-reply/popup-reply.component';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  loading: boolean = false;
  searchForm: FormGroup;
  lstStatus: any = [];
  userLogin: any;

  // khai báo biến cho phân trang
  maxPageView: number = 3; // hien thi so page tren thanh phan trang
  totalRecord: number = 0;
  page: number = 1;
  size: number = CONSTANT.PAGE.SIZE5;// so ban ghi tren 1 trang

  lstRegistration: any = [];
  bsModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    this.lstStatus = CONSTANT.TRANGTHAI;
    this.buildForm();
    this.searchDataRegis(null);
    this.refreshSelect();
  }

  // refresh selectpicker
  refreshSelect(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }

  /**
   * hàm khởi tạo form search
   */
  buildForm(): void {
    this.searchForm = this.fb.group({
      fileCode: [''],
      status: [''],
      dateFrom: [''],
      dateTo: ['']
    })
  }

  /**
   * hàm tìm kiếm hồ sơ
   * @param event
   */
  searchDataRegis(event: any): void {
    this.loading = true;
    if (event != null) {
      this.page = event.page;
    } else {
      this.page = 1;
    }

    let searchDTO = {
      fileCode: this.searchForm.controls.fileCode.value,
      status: this.searchForm.controls.status.value !== "" ? this.searchForm.controls.status.value : null,
      dateFrom: this.searchForm.controls.dateFrom.value !== "" ? this.searchForm.controls.dateFrom.value : null,
      dateTo: this.searchForm.controls.dateTo.value !== "" ? this.searchForm.controls.dateTo.value : null,
      userId: this.userLogin.id !== null ? this.userLogin.id : null,
      page: this.page - 1,
      size: this.size
    }

    let params = {
      searchDTO: JSON.stringify(searchDTO)
    }

    this.api.getDataToken(API_CONSTANT.REGIS.SEARCH, params).subscribe(d => {
      this.loading = false;
      if (d.success) {
        this.lstRegistration = d.data.list;
        this.totalRecord = d.data.count;
      } else {
        this.toastr.error('Thực hiện tìm kiếm có lỗi.', 'Lỗi');
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Hệ thống đang có lỗi, vui lòng thử lại sau.', 'Lỗi');
    })
  }

  // view hồ sơ đăng ký tuyển sinh
  clickViewRegis(item: any): void {
    this.router.navigate(['/edu/registration/view'], { queryParams: { idHoso: item.idHoso } });
  }

  // phản hồi yêu cầu xin sửa hồ sơ
  phanHoiXinsua(item: any): void {
    const initialState = {
      title: 'Phản hồi xin sửa hồ sơ',
      placeholder: 'Nhập vào nội dung phản hồi (nếu có) - bắt buộc đối với nội dung từ chối',
      idHoso: item.idHoso,
      maTrangthai: item.maTrangthai,
      maHoso: item.maHoso
    }
    this.bsModalRef = this.modalService.show(PopupReplyComponent, { initialState, class: 'modal-lg' });
    this.bsModalRef.content.event.subscribe(d => {
      this.loading = true;
      if (d !== null) {
        let sendData = {
          idHoso: item.idHoso,
          content: d.noidung,
          typeConfirm: d.typeConfirm
        }

        this.api.postDataToken(API_CONSTANT.SEND_DATA.PHANHOI_XINSUA, sendData, {}).subscribe(data => {
          this.loading = false;
          if (data.success) {
            this.toastr.success('Gửi phản hồi yêu cầu xin sửa hồ sơ thành công.', 'Thành công');
            this.searchDataRegis(null);
          } else {
            this.toastr.error('Gửi phản hồi yêu cầu xin sửa hồ sơ thất bại.', 'Lỗi');
          }
        }, error => {
          this.loading = false;
          this.toastr.error('Hệ thống đang xảy ra lỗi. Vui lòng thử lại sau.', 'Lỗi');
        });
      }
    })
  }

  // phản hồi yêu cầu xin rút hồ sơ
  phanhoiXinrut(item: any): void {
    const initialState = {
      title: 'Phản hồi xin rút hồ sơ',
      placeholder: 'Nhập vào nội dung phản hồi (nếu có) - bắt buộc đối với nội dung từ chối',
      idHoso: item.idHoso,
      maTrangthai: item.maTrangthai,
      maHoso: item.maHoso
    }
    this.bsModalRef = this.modalService.show(PopupReplyComponent, { initialState, class: 'modal-lg' });
    this.bsModalRef.content.event.subscribe(d => {
      this.loading = true;
      if (d !== null) {
        let sendData = {
          idHoso: item.idHoso,
          content: d.noidung,
          typeConfirm: d.typeConfirm
        }

        this.api.postDataToken(API_CONSTANT.SEND_DATA.PHANHOI_XINRUT, sendData, {}).subscribe(data => {
          this.loading = false;
          if (data.success) {
            this.toastr.success('Gửi phản hồi yêu cầu xin rút hồ sơ thành công.', 'Thành công');
            this.searchDataRegis(null);
          } else {
            this.toastr.error('Gửi phản hồi yêu cầu xin rút hồ sơ thất bại.', 'Lỗi');
          }
        }, error => {
          this.loading = false;
          this.toastr.error('Hệ thống đang xảy ra lỗi. Vui lòng thử lại sau.', 'Lỗi');
        });
      }
    })
  }

  // view lich su ho so
  clickHistory(item: any): void {
    const initialState = {
      item: item,
      title: "Lịch sử hồ sơ"
    };
    this.bsModalRef = this.modalService.show(HistoryRegisComponent, { initialState, class: 'modal-lg' });
  }

}
