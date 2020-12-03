import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as lodash from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
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
  cmnd1: any;
  cmnd2: any;
  cmnd3: any;
  cmnd4: any = 0;
  cmnd5: any = 0;
  cmnd6: any = 0;
  cmnd7: any = 0;
  cmnd8: any = 0;
  cmnd9: any = 0;
  cmnd10: any = 0;
  cmnd11: any = 0;
  cmnd12: any = 0;
  xaphuongThuongtru: any;
  tinh1: any = 0;
  tinh2: any = 0;
  huyen1: any = 0;
  huyen2: any = 0;
  xa1: any = 0;
  xa2: any = 0;
  lstProvince: any = [];
  truongThpt: string = "";
  madt1: any = 0;
  madt2: any = 0;
  madt3: any = 0;
  baoluuToan: boolean = false;
  baoluuVan: boolean = false;
  baoluuSu: boolean = false;
  baoluuDia: boolean = false;
  baoluuGD: boolean = false;
  baoluuLy: boolean = false;
  baoluuHoa: boolean = false;
  baoluuSinh: boolean = false;
  baoluuNN: boolean = false;
  diemToanBaoluu: number = 0;
  diemVanBaoluu: number = 0;
  diemSuBaoluu: number = 0;
  diemDiaBaoluu: number = 0;
  diemGdBaoluu: number = 0;
  diemLyBaoluu: number = 0;
  diemHoaBaoluu: number = 0;
  diemSinhBaoluu: number = 0;
  diemNNBaoluu: number = 0;
  dtg1: any;
  dtg2: any = ".";
  namtn1: any = 0;
  namtn2: any = 0;
  namtn3: any = 0;
  namtn4: any = 0;
  totalNv: any = 0;
  ngayGuiStr: string = "Ngày ... tháng ... năm 20....";

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      this.idRegistration = param.idHoso;
    });
    this.getProvince();
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
        let soCmnd = this.hosoItem.soCmnd;
        if (soCmnd !== "") {
          if (soCmnd.length === 9) {
            this.cmnd4 = soCmnd.charAt(0);
            this.cmnd5 = soCmnd.charAt(1);
            this.cmnd6 = soCmnd.charAt(2);
            this.cmnd7 = soCmnd.charAt(3);
            this.cmnd8 = soCmnd.charAt(4);
            this.cmnd9 = soCmnd.charAt(5);
            this.cmnd10 = soCmnd.charAt(6);
            this.cmnd11 = soCmnd.charAt(7);
            this.cmnd12 = soCmnd.charAt(8);
          } else if (soCmnd.length === 12) {
            this.cmnd1 = soCmnd.charAt(0);
            this.cmnd2 = soCmnd.charAt(1);
            this.cmnd3 = soCmnd.charAt(2);
            this.cmnd4 = soCmnd.charAt(3);
            this.cmnd5 = soCmnd.charAt(4);
            this.cmnd6 = soCmnd.charAt(5);
            this.cmnd7 = soCmnd.charAt(6);
            this.cmnd8 = soCmnd.charAt(7);
            this.cmnd9 = soCmnd.charAt(8);
            this.cmnd10 = soCmnd.charAt(9);
            this.cmnd11 = soCmnd.charAt(10);
            this.cmnd12 = soCmnd.charAt(11);
          }
        }
        let maTinh: string = this.hosoItem.maTinhthanhTt !== "" ? lodash.filter(this.lstProvince, (d) => {
          return d.id.toString() === this.hosoItem.maTinhthanhTt;
        })[0].provinceCode : "";
        if (maTinh !== "" && maTinh.length === 2) {
          this.tinh1 = maTinh.charAt(0);
          this.tinh2 = maTinh.charAt(1);
        }

        // lấy mã huyện của hộ khẩu thường trú
        let param = {
          idProvince: this.hosoItem.maTinhthanhTt !== "" ? parseFloat(this.hosoItem.maTinhthanhTt) : null
        };
        if (param.idProvince !== null) {
          this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DISTRICT, param).subscribe(d => {
            let maHuyen: string = this.hosoItem.maQuanhuyenTt !== "" ? lodash.filter(d.list, (d) => {
              return d.id === parseFloat(this.hosoItem.maQuanhuyenTt);
            })[0].districtCode : "";
            if (maHuyen !== "" && maHuyen.length === 2) {
              this.huyen1 = maHuyen.charAt(0);
              this.huyen2 = maHuyen.charAt(1);
            }
          });
        }

        // lấy mã phường thị trấn nếu có
        let maXaphuongTt = this.hosoItem.maXaphuongTt;
        if (maXaphuongTt === "6578") {
          this.xaphuongThuongtru = "xã " + this.hosoItem.tenXaphuongTtKhac;
        } else {
          this.xaphuongThuongtru = this.hosoItem.tenXaphuongTt;
          this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_WARD, { idDistrict: this.hosoItem.maQuanhuyenTt !== "" ? parseFloat(this.hosoItem.maQuanhuyenTt) : null }).subscribe(d => {
            let maXa: string = this.hosoItem.maXaphuongTt !== "" ? lodash.filter(d.list, (d) => {
              return d.id === parseFloat(this.hosoItem.maXaphuongTt);
            })[0].wardsCode : "";
            if (maXa !== "" && maXa.length === 2) {
              this.xa1 = maXa.charAt(0);
              this.xa2 = maXa.charAt(1);
            }
          });
        }

        if (this.hosoItem.maNoiDkdt !== "" && this.hosoItem.maNoiDkdt.length === 3) {
          this.madt1 = this.hosoItem.maNoiDkdt.charAt(0);
          this.madt2 = this.hosoItem.maNoiDkdt.charAt(1);
          this.madt3 = this.hosoItem.maNoiDkdt.charAt(2);
        }

        // xét thông tin điểm bảo lưu xét tốt nghiệp
        if (this.hosoItem.lstMonhocXtn !== null && this.hosoItem.lstMonhocXtn.length > 0) {
          for (let i = 0; i < this.hosoItem.lstMonhocXtn.length; i++) {
            switch (this.hosoItem.lstMonhocXtn[i].maMonthi) {
              case 1: {
                this.baoluuToan = true;
                this.diemToanBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 2: {
                this.baoluuVan = true;
                this.diemVanBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 3: {
                this.baoluuNN = true;
                this.diemNNBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 4: {
                this.baoluuLy = true;
                this.diemLyBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 5: {
                this.baoluuHoa = true;
                this.diemHoaBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 6: {
                this.baoluuSinh = true;
                this.diemSinhBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 7: {
                this.baoluuSu = true;
                this.diemSuBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 8: {
                this.baoluuDia = true;
                this.diemDiaBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              case 9: {
                this.baoluuGD = true;
                this.diemGdBaoluu = parseFloat(this.hosoItem.lstMonhocXtn[i].diemMonthi);
                break;
              }
              default:
                break;
            }
          }
        }

        // xét đối tượng ưu tiên
        if (this.hosoItem.maDtUutien !== "" && this.hosoItem.maDtUutien.length === 2) {
          this.dtg1 = this.hosoItem.maDtUutien.charAt(0);
          this.dtg2 = this.hosoItem.maDtUutien.charAt(1);
        }

        if (this.hosoItem.namTotnghiep !== "" && this.hosoItem.namTotnghiep.length === 4) {
          this.namtn1 = this.hosoItem.namTotnghiep.charAt(0);
          this.namtn2 = this.hosoItem.namTotnghiep.charAt(1);
          this.namtn3 = this.hosoItem.namTotnghiep.charAt(2);
          this.namtn4 = this.hosoItem.namTotnghiep.charAt(3);
        }

        if (this.hosoItem.lstExam !== null && this.hosoItem.lstExam.length > 0) {
          this.totalNv = this.hosoItem.lstExam.length;
        }

        // set ngay gui
        if (this.hosoItem.ngayGui !== null) {
          let sendDate = new Date(this.hosoItem.ngayGui);
          let d = (sendDate.getDate() >= 10) ? sendDate.getDate() : "0" + sendDate.getDate();
          let m = (sendDate.getMonth() >= 9) ? sendDate.getMonth() + 1 : "0" + (sendDate.getMonth() + 1);
          let y = sendDate.getFullYear();
          this.ngayGuiStr = "Ngày " + d + " tháng " + m + " năm " + y;
        }
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Không lấy được dữ liệu hồ sơ. Có lỗi phát sinh.', 'Lỗi');
    })
  }

  // lấy danh mục tỉnh, thành phố
  getProvince(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_PROVINCE, {}).subscribe(data => {
      this.lstProvince = data.list;
    });
  }

  // trở lại màn trước đó
  clickBack(): void {
    this.location.back();
  }

}
