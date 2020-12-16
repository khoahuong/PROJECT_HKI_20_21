import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { ConfirmPopupComponent } from 'src/app/common/confirm-popup/confirm-popup.component';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';
import { AppService } from 'src/app/common/services/app.service';
import { PopupInfoComponent } from '../popup-info/popup-info.component';
import { PopupRegisComponent } from '../popup-regis/popup-regis.component';
import { RegisHistoryComponent } from '../regis-history/regis-history.component';
import { UserInfoComponent } from '../user-info/user-info.component';
declare var $: any;
@Component({
  selector: 'app-regis-index',
  templateUrl: './regis-index.component.html',
  styleUrls: ['./regis-index.component.scss']
})
export class RegisIndexComponent implements OnInit {

  loading: boolean = false;
  searchForm: FormGroup;
  lstStatus: any = [];

  userLogin: any;

  // khai báo biến cho phân trang
  maxPageView: number = 3; // hien thi so page tren thanh phan trang
  totalRecord: number = 0;
  page: number = 1;
  size: number = CONSTANT.PAGE.SIZE10;// so ban ghi tren 1 trang

  lstRecord: any = [];

  bsModalRef: BsModalRef;

  userInfoView: any = {};

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private app: AppService
  ) { }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    this.buildForm();
    this.searchDataRegis(null);
    this.getStatus();
    this.getUserInfo(this.userLogin.id);
    this.refreshSelect();
  }

  refreshSelect(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }

  /**
   * ham khoi tao form Search
   */
  buildForm() {
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

    let searchRegisDto = {
      fileCode: this.searchForm.controls.fileCode.value,
      status: this.searchForm.controls.status.value != "" ? this.searchForm.controls.status.value : null,
      dateFrom: this.searchForm.controls.dateFrom.value != "" ? this.searchForm.controls.dateFrom.value : null,
      dateTo: this.searchForm.controls.dateTo.value != "" ? this.searchForm.controls.dateTo.value : null,
      userId: this.userLogin.id ? this.userLogin.id : null,
      page: this.page - 1,
      size: this.size
    }

    let params = {
      searchRegisDto: JSON.stringify(searchRegisDto)
    }

    this.api.getDataToken(API_CONSTANT.REGISTRATION.SEARCH, params).subscribe(d => {
      this.loading = false;
      if (d.success) {
        this.lstRecord = d.data.list;
        this.totalRecord = d.data.count;
      } else {
        this.toast.error('Lỗi', "Tìm kiếm hồ sơ có lỗi phát sinh.");
      }
    }, error => {
      this.loading = false;
      this.toast.error('Lỗi', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
    });
  }

  /**
   * lấy danh mục trạng thái hồ sơ
   */
  getStatus() {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_STATUS, {}).subscribe(data => {
      this.lstStatus = data.list;
    }, error => {
      this.toast.error('Lỗi', 'Không lấy được danh mục trạng thái hồ sơ');
    });
  }

  /**
   * function add thêm mới hồ sơ
   * @param item
   */
  clickAddRegis(item: any) {
    let id = item && item.idHoso ? item.idHoso : null;
    this.router.navigate(['/regis/edit'], { queryParams: { idHoso: id } });
  }

  /**
   * hàm đăng xuất tài khoản
   */
  logout(): void {
    this.loading = true;
    if (typeof (Storage) !== "undefined") {
      this.loading = false;
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      this.loading = false;
      this.toast.warning('Cảnh báo', 'Đăng xuất thất bại.');
    }
  }

  /**
   * View thông tin cá nhân
   */
  viewInfo(num: number): void {
    const initialState = {
      idForm: num,
      infoUser: this.userInfoView,
      title: num == 1 ? "Thông tin cá nhân" : "Đổi mật khẩu"
    };

    let sizeModal: string = num == 1 ? "modal-lg" : "";

    this.bsModalRef = this.modalService.show(UserInfoComponent, { initialState, class: sizeModal });
    this.bsModalRef.content.event.subscribe(result => {
      if (result === "OK") {
        this.getUserInfo(this.userLogin.id);
        this.searchDataRegis(null);
      }
    });
  }

  /**
   * get thong tin tai khoan tu database
   * @param id
   */
  getUserInfo(id: number) {
    this.api.getDataToken(API_CONSTANT.API_USER.GET_USER_BY_ID, { idUser: id }).subscribe(data => {
      this.userInfoView = data.data;
    }, error => {

    });
  }

  /**
   * Hàm xóa hồ sơ
   * @param item
   */
  deleted(item: any): void {
    const initialState = {
      title: 'Thông báo',
      message: 'Bạn chắc chắn muốn xóa thông tin hồ sơ <b>' + item.maHoso + '</b> này không?'
    }
    this.bsModalRef = this.modalService.show(ConfirmPopupComponent, { initialState });
    this.bsModalRef.content.event.subscribe(result => {
      if (result == "OK") {
        this.api.postDataToken(API_CONSTANT.REGISTRATION.DELETE, {}, { idRegis: item.idHoso, userId: item.userId }).subscribe(data => {
          if (data.success) {
            this.toast.success('Thành công', 'Xóa thông tin hồ sơ thành công.');
            this.searchDataRegis(null);
          } else {
            this.toast.error('Lỗi', 'Xóa hồ sơ không thành công. Vui lòng thử lại.');
          }
        }, error => {
          this.toast.error('Lỗi', 'Hệ thống có lỗi, vui lòng thực hiện lại sau.');
        });
      }
    });
  }

  /**
   * Xem lịch sử xử lý hồ sơ
   * @param item
   */
  clickHistory(item: any): void {
    const initialState = {
      item: item,
      title: "Lịch sử hồ sơ"
    };
    this.bsModalRef = this.modalService.show(RegisHistoryComponent, { initialState, class: 'modal-lg' });
  }

  // xin rút hồ sơ
  clickXinrut(item: any): void {
    const initialState = {
      title: 'Xin rút hồ sơ',
      placeholder: 'Nhập vào nội dung yêu cầu xin rút hồ sơ'
    }
    this.bsModalRef = this.modalService.show(PopupRegisComponent, { initialState });
    this.bsModalRef.content.event.subscribe(data => {
      this.loading = true;
      if (data !== "") {
        let sendData = {
          idHoso: item.idHoso,
          content: data
        }

        this.api.postDataToken(API_CONSTANT.SEND_DATA.YC_XIN_RUT, sendData, {}).subscribe(data => {
          this.loading = false;
          if (data.success) {
            this.toast.success('Gửi yêu cầu xin rút hồ sơ thành công.', 'Thành công');
            this.searchDataRegis(null);
          } else {
            this.toast.error('Gửi yêu cầu xin rút hồ sơ thất bại.', 'Lỗi');
          }
        }, error => {
          this.loading = false;
          this.toast.error('Hệ thống đang xảy ra lỗi. Vui lòng thử lại sau.', 'Lỗi');
        });
      }
    })
  }

  // xin sửa hồ sơ
  clickXinsua(item: any): void {
    const initialState = {
      title: 'Xin sửa hồ sơ',
      placeholder: 'Nhập vào nội dung yêu cầu xin sửa'
    }
    this.bsModalRef = this.modalService.show(PopupRegisComponent, { initialState });
    this.bsModalRef.content.event.subscribe(data => {
      this.loading = true;
      if (data !== "") {
        let sendData = {
          idHoso: item.idHoso,
          content: data
        }

        this.api.postDataToken(API_CONSTANT.SEND_DATA.YC_XIN_SUA, sendData, {}).subscribe(data => {
          this.loading = false;
          if (data.success) {
            this.toast.success('Gửi yêu cầu xin sửa hồ sơ thành công.', 'Thành công');
            this.searchDataRegis(null);
          } else {
            this.toast.error('Gửi yêu cầu xin sửa hồ sơ thất bại.', 'Lỗi');
          }
        }, error => {
          this.loading = false;
          this.toast.error('Hệ thống đang xảy ra lỗi. Vui lòng thử lại sau.', 'Lỗi');
        });
      }
    })
  }

  // xem trang thai ho so
  clickTrangthaiHs(item: any): void {
    switch (item.maTrangthai) {
      case 3:
      case 5:
      case 9:
      case 12:
        const initialState = {
          title: 'Thông báo nội dung yêu cầu của Bộ GD&ĐT',
          idHoso: item.idHoso,
          maTrangthai: item.maTrangthai
        }
        this.bsModalRef = this.modalService.show(PopupInfoComponent, { initialState });
        break;
      default:
        this.app.popupAlert('Thông báo', 'Hồ sơ <b>' + item.maHoso + '</b> đang ở trạng thái <b>' + item.tenTrangthai + '</b>');
        break;
    }
  }

  // xem thông tin hồ sơ đăng ký
  clickViewRegis(item: any): void {
    let id = item && item.idHoso ? item.idHoso : null;
    this.router.navigate(['/regis/view'], { queryParams: { idHoso: id } });
  }

}
