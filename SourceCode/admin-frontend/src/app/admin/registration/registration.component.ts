import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';
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
  size: number = CONSTANT.PAGE.SIZE10;// so ban ghi tren 1 trang

  lstRegistration: any = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService
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
        console.log(d.data.list);
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

}
