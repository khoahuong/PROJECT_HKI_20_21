import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { ToastUltilsService } from 'src/app/common/toast/toast-ultils.service';

@Component({
  selector: 'app-regis-index',
  templateUrl: './regis-index.component.html',
  styleUrls: ['./regis-index.component.scss']
})
export class RegisIndexComponent implements OnInit {

  loading: boolean = false;
  searchForm: FormGroup;
  lstStatus: any = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastUltilsService
  ) { }

  ngOnInit(): void {
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
  searchDataRegis(event: any): void {

  }

  /**
   * lấy danh mục trạng thái hồ sơ
   */
  getStatus() {
    this.api.get(API_CONSTANT.STATUS.GET_DATA_STATUS, {}).subscribe(data => {
      this.lstStatus = data;
    }, error => {
      this.toast.showError('Lỗi', 'Không lấy được danh mục trạng thái hồ sơ');
    });
  }

  /**
   * function add thêm mới hồ sơ
   * @param item
   */
  clickAddRegis(item: any) {

  }
}
