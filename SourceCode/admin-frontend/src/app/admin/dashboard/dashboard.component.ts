import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as lodash from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = false;
  lstAllRegis: any = [];
  totalRegis: number = 0;
  userLogin: any;
  slChoduyet: number = 0;
  tileHsChoduyet: any = 0;
  slDaduyet: number = 0;
  tileHsDaduyet: any = 0;
  slNgungxl: number = 0;
  tileHsNgungxl: any = 0;
  khuvuc: string = "";
  tongTile: number = 0;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    let lstKhuvuc: any = CONSTANT.KHUVUC;
    let khuvucObj = lodash.filter(lstKhuvuc, (d) => {
      return d.id === this.userLogin.khuvucQuanly;
    });
    this.khuvuc = khuvucObj[0].name;
    this.getAllData();
  }

  // lấy thông tin các hồ sơ
  getAllData(): void {
    let userId = this.userLogin.id !== null ? this.userLogin.id : null;
    this.api.getDataToken(API_CONSTANT.REGIS.GET_ALL_DATA, { userId: userId }).subscribe(d => {
      if (d.list !== null) {
        this.lstAllRegis = d.list;
        this.totalRegis = this.lstAllRegis.length;
        let lstHsChoduyet = lodash.filter(this.lstAllRegis, (d) => {
          return (d.maTrangthai !== 0 && d.maTrangthai !== 2 && d.maTrangthai !== 5 && d.maTrangthai !== 6 && d.maTrangthai !== 8);
        });
        this.slChoduyet = lstHsChoduyet.length;
        this.tileHsChoduyet = Math.round((this.slChoduyet / this.totalRegis) * 10000) / 100;
        let lstHsDaduyet = lodash.filter(this.lstAllRegis, (d) => {
          return d.maTrangthai === 2;
        });
        this.slDaduyet = lstHsDaduyet.length;
        this.tileHsDaduyet = Math.round((this.slDaduyet / this.totalRegis) * 10000) / 100;
        let lstHsNgungXl = lodash.filter(this.lstAllRegis, (d) => {
          return (d.maTrangthai === 5 || d.maTrangthai === 6 || d.maTrangthai === 8);
        });
        this.slNgungxl = lstHsNgungXl.length;
        this.tileHsNgungxl = Math.round((this.slNgungxl / this.totalRegis) * 10000) / 100;

        this.api.getDataToken(API_CONSTANT.REGIS.GET_DATA_FOR_ADMIN, {}).subscribe(data => {
          if (data.list !== null) {
            let lstRegisForAdmin = lodash.filter(data.list, (d) => {
              return d.maTrangthai !== 0;
            });
            this.tongTile = Math.round((this.totalRegis / lstRegisForAdmin.length) * 10000) / 100;
          }
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Hệ thống đang có lỗi, vui lòng thử lại sau.', 'Lỗi');
    })
  }

  clickLinkRegis(): void {
    this.router.navigate(['/edu/registration']);
  }

}
