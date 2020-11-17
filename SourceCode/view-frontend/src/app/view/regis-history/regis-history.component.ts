import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';

@Component({
  selector: 'app-regis-history',
  templateUrl: './regis-history.component.html',
  styleUrls: ['./regis-history.component.scss']
})
export class RegisHistoryComponent implements OnInit {

  loading: boolean = false;
  @Input() title: any;
  @Input() item: any;

  // khai báo biến cho phân trang
  maxPageView: number = 2; // hien thi so page tren thanh phan trang
  totalRecord: number = 0;
  page: number = 1;
  size: number = CONSTANT.PAGE.SIZE5;// so ban ghi tren 1 trang

  lstHistory: any = [];

  constructor(
    public bsModalRef: BsModalRef,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.searchHistory(null);
  }

  /**
   * đóng popup lịch sử
   */
  closeHistory(): void {
    this.bsModalRef.hide();
  }

  /**
   * hàm tìm kiếm lịch sử của hồ sơ
   * @param event
   */
  searchHistory(event: any): void {
    this.loading = true;
    if (event != null) {
      this.page = event.page;
    } else {
      this.page = 1;
    }
    let searchHisDto = {
      idHoso: this.item.idHoso,
      page: this.page - 1,
      size: this.size
    }
    let params = {
      searchHisDto: JSON.stringify(searchHisDto)
    }
    this.api.getDataToken(API_CONSTANT.HISTORY.SEARCH, params).subscribe(d => {
      this.loading = false;
      if (d.success) {
        this.lstHistory = d.data.list;
        this.totalRecord = d.data.count;
      } else {
        this.toastr.error('Lỗi', "Tìm kiếm lịch sử hồ sơ có lỗi phát sinh.");
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Lỗi', 'Không lấy được dữ liệu lịch sử hồ sơ.');
    });
  }

}
