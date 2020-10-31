import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';

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
  totalRecord:number = 0;
  maxPageView:number = CONSTANT.PAGE.SIZE5;
  page:number = 1;
  size:number = CONSTANT.PAGE.SIZE10;// so ban ghi tren 1 trang

  lstRecord: any = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    this.buildForm();
    this.searchDataRegis(null);
    this.getStatus();
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
  searchDataRegis(item: any): void {

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
    this.router.navigate(['/regis/edit', { 'data': item }]);
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
  viewInfo(): void {

  }
}
