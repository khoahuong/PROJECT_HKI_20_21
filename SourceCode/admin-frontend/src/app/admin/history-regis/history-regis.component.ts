import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';

@Component({
  selector: 'app-history-regis',
  templateUrl: './history-regis.component.html',
  styleUrls: ['./history-regis.component.scss']
})
export class HistoryRegisComponent implements OnInit {

  loading: boolean = false;
  @Input() title: any;
  @Input() item: any;

  // khai báo biến cho phân trang
  maxPageView: number = 3; // hien thi so page tren thanh phan trang
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

  closeHistory(): void {
    this.bsModalRef.hide();
  }

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
        this.toastr.error("Tìm kiếm lịch sử hồ sơ có lỗi phát sinh.", "Lỗi");
      }
    }, error => {
      this.loading = false;
      this.toastr.error("Có lỗi phát sinh, vui lòng thử lại sau", "Lỗi");
    });
  }

}
