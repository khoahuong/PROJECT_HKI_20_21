import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { TableRegistrationDomain } from 'src/app/model/TableRegistrationDomain';

@Component({
  selector: 'app-view-regis',
  templateUrl: './view-regis.component.html',
  styleUrls: ['./view-regis.component.scss']
})
export class ViewRegisComponent implements OnInit {

  loading: boolean = false;
  idRegistration: any;
  hosoItem: TableRegistrationDomain = new TableRegistrationDomain();
  maSo1: any = 0;
  maSo2: any = 0;
  ngay1: any = 0;
  ngay2: any = 0;
  thang1: any = 0;
  thang2: any = 0;
  nam1: any = 0;
  nam2: any = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      this.idRegistration = param.idHoso;
    })
    if (this.idRegistration !== undefined) {
      this.getDataHoso();
    }
  }

  // hàm lấy thông tin data hồ sơ
  getDataHoso(): void {
    this.loading = true;
    this.api.getDataToken(API_CONSTANT.REGIS.GET_DATA, { idHoso: this.idRegistration }).subscribe(d => {
      this.loading = false;
      this.hosoItem = d.data;
      console.log(this.hosoItem);
      if (this.hosoItem !== null) {
        this.maSo1 = (this.hosoItem.maSoGddt).charAt(0);
        this.maSo2 = (this.hosoItem.maSoGddt).charAt(1);
        let ngaysinh = this.hosoItem.ngaySinh !== null ? new Date(this.hosoItem.ngaySinh) : null;
        if (ngaysinh !== null) {
          let d = (ngaysinh.getDate() >= 10) ? ngaysinh.getDate() : "0" + ngaysinh.getDate();
          let m = (ngaysinh.getMonth() >= 9) ? ngaysinh.getMonth() + 1 : "0" + (ngaysinh.getMonth() + 1);
          let y = ngaysinh.getFullYear();
          this.ngay1 = d.toString().charAt(0);
          this.ngay2 = d.toString().charAt(1);
          this.thang1 = m.toString().charAt(0);
          this.thang2 = m.toString().charAt(1);
          this.nam1 = y.toString().charAt(2);
          this.nam2 = y.toString().charAt(3);
        }
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Không lấy được dữ liệu hồ sơ. Có lỗi phát sinh.', 'Lỗi');
    })
  }

}
