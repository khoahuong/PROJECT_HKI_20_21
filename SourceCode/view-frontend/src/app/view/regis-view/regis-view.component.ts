import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';
import { AppService } from 'src/app/common/services/app.service';
import { TableAttachments } from 'src/app/model/TableAttachments';
import * as fileSaver from 'file-saver';
declare var $: any;

@Component({
  selector: 'app-regis-view',
  templateUrl: './regis-view.component.html',
  styleUrls: ['./regis-view.component.scss']
})
export class RegisViewComponent implements OnInit {

  loading: boolean = false;
  userLogin: any;
  idRegis: any;

  editForm: FormGroup;

  lstGender: any = [];
  lstProvince: any = [];
  lstDistrict: any = [];
  lstWard: any = [];
  lstShool: any = [];
  lstKieuthisinh: any = [];
  lstSoGddt: any = [];
  lstMonNgoaingu: any = [];
  lstMonhocXtn: any = [];
  lstMonhocBaoluu: any = [];
  lstDoituongUutien: any = [];
  lstKhuvucTs: any = [];
  lstYear: any = [];
  lstXettuyenLienthong: any = [];
  lstExam: any = [];

  isShowXaphuong: boolean = true;
  isShowMonNgoaingu: boolean = true;

  lstDinhkem: Array<TableAttachments> = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private app: AppService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    this.lstGender = CONSTANT.GENDER;
    this.lstKieuthisinh = CONSTANT.TYPE_STUDENT;
    this.lstMonNgoaingu = CONSTANT.MON_NGOAINGU;
    this.lstShool = CONSTANT.CLASS_NAME;
    this.lstXettuyenLienthong = CONSTANT.DA_TOTNGHIEP;
    this.activeRoute.queryParams.subscribe(params => {
      this.idRegis = params.idHoso;
    });

    this.buildForm();
    this.getProvince();
    this.getDmSoGDDT();
    this.getDmMonhocBaoluu();
    this.getDmDoituongUutien();
    this.getDmKhuvucTs();
    this.getListYear();

    if (this.idRegis !== undefined) {
      this.getDataBindingForEdit();
    }
    this.refreshSelect();
  }

  refreshSelect(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 500);
  }

  /**
   * khoi tao form
   */
  buildForm(): void {
    this.editForm = this.fb.group({
      maHoso: [''],
      tenTrangthai: [''],
      ngayTao: [''],
      ngayGui: [''],
      hotenThisinh: [''],
      maGioitinh: [''],
      ngaySinh: [''],
      maNoisinh: [''],
      danToc: [''],
      isNational: [''],
      soCmnd: [''],
      maTinhthanhTt: [''],
      maQuanhuyenTt: [''],
      maXaphuongTt: [''],
      tenXaphuongTtKhac: [''],
      hkttKvi: [''],
      hkttDbkk: [''],
      sdtThisinh: [''],
      emailThisinh: [''],
      thongtinLienhe: [''],
      tenLop12: [''],
      xettuyenDhcd: [''],
      chuongtrinhHocthisinh: [''],
      thisinhTudoTn: [''],
      maSoGddt: [''],
      tenNoiDkdt: [''],
      maNoiDkdt: [''],
      monToan: [''],
      monNguvan: [''],
      monNgoaingu: [''],
      monNgoainguChitiet: [''],
      monKhtn: [''],
      monKhxh: [''],
      monVatly: [''],
      monHoahoc: [''],
      monSinhhoc: [''],
      monLichsu: [''],
      monDialy: [''],
      monGdcd: [''],
      chungchiNgoaingu: [''],
      diemthiChungchiNn: [''],
      maDtUutien: [''],
      maKhuvucTs: [''],
      namTotnghiep: [''],
      maLienthong: ['']
    })
  }

  /**
   * hàm get danh mục tỉnh
   */
  getProvince(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_PROVINCE, {}).subscribe(data => {
      this.lstProvince = data.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục tỉnh thành.');
    });
  }

  getDmSoGDDT(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_GDDT, {}).subscribe(d => {
      this.lstSoGddt = d.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục Sở giáo dục và đào tạo.');
    });
  }

  getDmMonhocBaoluu(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_SUBJECTS, {}).subscribe(d => {
      this.lstMonhocBaoluu = d.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục môn học xin bảo lưu điểm.');
    });
  }

  getDmDoituongUutien(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DOITUONG_UUTIEN, {}).subscribe(d => {
      this.lstDoituongUutien = d.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục đối tượng ưu tiên.');
    });
  }

  getDmKhuvucTs(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_KHUVUC_TS, {}).subscribe(d => {
      this.lstKhuvucTs = d.list;
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses after 0.1s
      }, 500);
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục khu vực tuyển sinh.');
    });
  }

  getListYear(): void {
    let currentYear = new Date().getFullYear();
    for (let i = 1970; i <= currentYear; i++) {
      this.lstYear.unshift({ value: i });
    }
  }

  /**
   * hàm lấy dữ liệu cho sửa hồ sơ
   */
  getDataBindingForEdit(): void {
    this.loading = true;
    this.api.getDataToken(API_CONSTANT.REGISTRATION.GET_DATA, { idHoso: this.idRegis }).subscribe(data => {
      let hoso = data.data;
      if (hoso) {
        this.editForm.controls.maHoso.setValue(hoso.maHoso);
        this.editForm.controls.tenTrangthai.setValue(hoso.tenTrangthai);
        this.editForm.controls.ngayTao.setValue(new Date(hoso.ngayTao));
        this.editForm.controls.ngayGui.setValue(hoso.ngayGui ? new Date(hoso.ngayGui) : null);
        this.editForm.controls.hotenThisinh.setValue(hoso.hotenThisinh);
        this.editForm.controls.maGioitinh.setValue((hoso.maGioitinh !== '' && hoso.maGioitinh !== null) ? hoso.maGioitinh : '');
        this.editForm.controls.ngaySinh.setValue(hoso.ngaySinh ? new Date(hoso.ngaySinh) : null);
        this.editForm.controls.maNoisinh.setValue((hoso.maNoisinh !== '' && hoso.maNoisinh !== null) ? hoso.maNoisinh : '');
        this.editForm.controls.danToc.setValue(hoso.danToc);
        this.editForm.controls.isNational.setValue(hoso.isNational);
        this.editForm.controls.soCmnd.setValue(hoso.soCmnd);
        this.editForm.controls.sdtThisinh.setValue(hoso.sdtThisinh);
        this.editForm.controls.emailThisinh.setValue(hoso.emailThisinh);
        this.editForm.controls.thongtinLienhe.setValue(hoso.thongtinLienhe);
        this.editForm.controls.maTinhthanhTt.setValue((hoso.maTinhthanhTt !== '' && hoso.maTinhthanhTt !== null) ? parseInt(hoso.maTinhthanhTt) : '');
        this.getDistrictHKTT();
        this.editForm.controls.maQuanhuyenTt.setValue((hoso.maQuanhuyenTt !== '' && hoso.maQuanhuyenTt !== null) ? parseInt(hoso.maQuanhuyenTt) : '');
        this.getWardHKTT();
        this.editForm.controls.maXaphuongTt.setValue((hoso.maXaphuongTt !== '' && hoso.maXaphuongTt !== null) ? parseInt(hoso.maXaphuongTt) : '');
        this.getWardHKTTKhac();
        this.editForm.controls.tenXaphuongTtKhac.setValue(hoso.tenXaphuongTtKhac);
        this.editForm.controls.hkttKvi.setValue(hoso.hkttKvi);
        this.editForm.controls.hkttDbkk.setValue(hoso.hkttDbkk);
        this.lstShool = hoso.lstShool;
        for (let i = 0; i < this.lstShool.length; i++) {
          let param = {
            idProvince: this.lstShool[i].idTinh
          };
          if (param.idProvince !== null) {
            this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DISTRICT, param).subscribe(d => {
              this.lstShool[i].lstHuyen = d.list;
            }, error => {
              this.toastr.error('Lỗi', 'Không lấy được danh mục quận huyện của THPT.');
            });
          }
          let param1 = {
            idDistrict: this.lstShool[i].idHuyen
          };
          if (param1.idDistrict !== null) {
            this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_SCHOOL, param1).subscribe(d => {
              this.lstShool[i].lstThpt = d.list;
            }, error => {
              this.toastr.error('Lỗi', 'Không lấy được danh mục trường THPT.');
            });
          }
          setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
          }, 1000);
        }
        this.editForm.controls.tenLop12.setValue(hoso.tenLop12);
        this.editForm.controls.xettuyenDhcd.setValue(hoso.xettuyenDhcd);
        this.editForm.controls.chuongtrinhHocthisinh.setValue((hoso.chuongtrinhHocthisinh !== '' && hoso.chuongtrinhHocthisinh !== null) ? (hoso.chuongtrinhHocthisinh).toString() : '');
        this.editForm.controls.thisinhTudoTn.setValue((hoso.thisinhTudoTn !== '' && hoso.thisinhTudoTn !== null) ? (hoso.thisinhTudoTn).toString() : '');
        this.editForm.controls.maSoGddt.setValue((hoso.maSoGddt !== '' && hoso.maSoGddt !== null) ? hoso.maSoGddt : '');
        this.editForm.controls.tenNoiDkdt.setValue(hoso.tenNoiDkdt);
        this.editForm.controls.maNoiDkdt.setValue(hoso.maNoiDkdt);
        this.editForm.controls.monToan.setValue(hoso.monToan);
        this.editForm.controls.monNguvan.setValue(hoso.monNguvan);
        this.editForm.controls.monNgoaingu.setValue(hoso.monNgoaingu);
        if (this.editForm.controls.monNgoaingu.value) {
          this.isShowMonNgoaingu = false;
        } else {
          this.isShowMonNgoaingu = true;
        }
        this.editForm.controls.monNgoainguChitiet.setValue(hoso.monNgoainguChitiet);
        this.editForm.controls.monKhtn.setValue(hoso.monKhtn);
        this.editForm.controls.monKhxh.setValue(hoso.monKhxh);
        this.editForm.controls.monVatly.setValue(hoso.monVatly);
        this.editForm.controls.monHoahoc.setValue(hoso.monHoahoc);
        this.editForm.controls.monSinhhoc.setValue(hoso.monSinhhoc);
        this.editForm.controls.monLichsu.setValue(hoso.monLichsu);
        this.editForm.controls.monDialy.setValue(hoso.monDialy);
        this.editForm.controls.monGdcd.setValue(hoso.monGdcd);
        this.editForm.controls.chungchiNgoaingu.setValue(hoso.chungchiNgoaingu);
        this.editForm.controls.diemthiChungchiNn.setValue(hoso.diemthiChungchiNn);
        this.lstMonhocXtn = hoso.lstMonhocXtn;
        this.editForm.controls.maDtUutien.setValue((hoso.maDtUutien !== '' && hoso.maDtUutien !== null) ? hoso.maDtUutien : '');
        this.editForm.controls.maKhuvucTs.setValue((hoso.maKhuvucTs !== '' && hoso.maKhuvucTs !== null) ? hoso.maKhuvucTs : '');
        this.editForm.controls.namTotnghiep.setValue((hoso.namTotnghiep !== '' && hoso.namTotnghiep !== null) ? parseInt(hoso.namTotnghiep) : '');
        this.editForm.controls.maLienthong.setValue((hoso.maLienthong !== '' && hoso.maLienthong !== null) ? parseInt(hoso.maLienthong) : '');
        this.lstExam = hoso.lstExam;
        this.lstDinhkem = hoso.lstDinhkem;
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh');
        }, 1200);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Lỗi', 'Không lấy được dữ liệu hồ sơ');
    });
  }

  getDistrictHKTT(): void {
    let param = {
      idProvince: this.editForm.controls.maTinhthanhTt.value ? this.editForm.controls.maTinhthanhTt.value : null
    };
    this.lstDistrict = [];
    this.editForm.controls.maQuanhuyenTt.setValue('');
    this.lstWard = [];
    this.editForm.controls.maXaphuongTt.setValue('');
    if (param.idProvince !== null) {
      this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DISTRICT, param).subscribe(d => {
        this.lstDistrict = d.list;
      }, error => {
        this.toastr.error('Lỗi', 'Không lấy được danh mục quận huyện.');
      });
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses after 0.1s
    }, 500);
  }

  getWardHKTT(): void {
    let param = {
      idDistrict: this.editForm.controls.maQuanhuyenTt.value ? this.editForm.controls.maQuanhuyenTt.value : null
    };
    this.lstWard = [];
    this.editForm.controls.maXaphuongTt.setValue('');
    if (param.idDistrict !== null) {
      this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_WARD, param).subscribe(d => {
        this.lstWard = d.list;
        this.lstWard.push({ id: 6578, wardsName: "Xã, phường, thị trấn khác" });
      }, error => {
        this.toastr.error('Lỗi', 'Không lấy được danh mục xã, phường.');
      });
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 500);
  }

  getWardHKTTKhac(): void {
    // let idWard = item.target.value;
    let idWard = this.editForm.controls.maXaphuongTt.value;
    if (idWard === 6578) {
      this.isShowXaphuong = false;
    } else {
      this.editForm.controls.tenXaphuongTtKhac.setValue('');
      this.isShowXaphuong = true;
    }
  }

  clickBack(): void {
    this.location.back();
  }

  downloadFile(item: any): void {
    this.loading = true;
    this.api.downloadFile({ filePath: item.fileUrl }).subscribe(d => {
      let blob: any = new Blob([d], { type: d.type });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      // window.location.href = d.url;
      fileSaver.saveAs(blob, item.fileName);
      this.loading = false;
      // this.toastr.success('Thành công', 'Tải xuống tệp đính kèm thành công.');
    }, error => {
      this.loading = false;
      this.toastr.error('Lỗi', 'Có lỗi phát sinh, vui lòng thực hiện lại');
    })
  }

}
