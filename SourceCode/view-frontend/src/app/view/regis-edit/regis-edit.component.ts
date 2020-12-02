import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fileSaver from 'file-saver';
import * as lodash from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { ConfirmPopupComponent } from 'src/app/common/confirm-popup/confirm-popup.component';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';
import { AppService } from 'src/app/common/services/app.service';
import { TableAttachments } from 'src/app/model/TableAttachments';
import { RegisEditPopupComponent } from '../regis-edit-popup/regis-edit-popup.component';
declare var $: any;
@Component({
  selector: 'app-regis-edit',
  templateUrl: './regis-edit.component.html',
  styleUrls: ['./regis-edit.component.scss']
})
export class RegisEditComponent implements OnInit {

  loading: boolean = false;
  userLogin: any;
  titleEdit: String = "";
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
  showBtnSave: boolean = false;

  bsModalRef: BsModalRef;

  lstDinhkem: Array<TableAttachments> = [];
  submitted: boolean = false;
  validXaKhac: boolean = false;
  lbl_errorMonngoainguDki: boolean = false;
  showThongtinHs: boolean = false;

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
    this.titleEdit = this.idRegis !== undefined ? "Cập nhật thông tin hồ sơ" : "Thêm mới thông tin hồ sơ";
    this.buildForm();
    this.getProvince();
    this.getDmSoGDDT();
    this.getDmMonhocBaoluu();
    this.getDmDoituongUutien();
    this.getDmKhuvucTs();
    this.getListYear();
    if (this.idRegis === undefined) {
      this.getDmDinhkem();
      this.fillDataUserForRegis();
      this.showBtnSave = true;
    } else {
      this.getDataBindingForEdit();
      this.showThongtinHs = true;
    }
    this.refreshSelect();
  }

  refreshSelect(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 500);
  }
  get f() { return this.editForm.controls }

  /**
   * khoi tao form
   */
  buildForm(): void {
    this.editForm = this.fb.group({
      maHoso: ['', []],
      tenTrangthai: ['', []],
      ngayTao: ['', []],
      ngayGui: ['', []],
      hotenThisinh: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      maGioitinh: ['', [
        Validators.required
      ]],
      ngaySinh: ['', [
        Validators.required
      ]],
      maNoisinh: ['', [
        Validators.required
      ]],
      danToc: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      isNational: [''],
      soCmnd: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(9)
      ]],
      maTinhthanhTt: ['', [
        Validators.required
      ]],
      maQuanhuyenTt: ['', [
        Validators.required
      ]],
      maXaphuongTt: ['', [
        Validators.required
      ]],
      tenXaphuongTtKhac: ['', []],
      hkttKvi: [''],
      hkttDbkk: [''],
      sdtThisinh: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      emailThisinh: ['', [
        Validators.required,
        Validators.maxLength(100),
        Validators.email
      ]],
      thongtinLienhe: ['', [
        Validators.required,
        Validators.maxLength(512)
      ]],
      tenLop12: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      xettuyenDhcd: [''],
      chuongtrinhHocthisinh: ['', [
        Validators.required
      ]],
      thisinhTudoTn: [''],
      maSoGddt: ['', [
        Validators.required
      ]],
      tenNoiDkdt: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      maNoiDkdt: ['', [
        Validators.required,
        Validators.maxLength(3)
      ]],
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
      maKhuvucTs: ['', [
        Validators.required
      ]],
      namTotnghiep: ['', [
        Validators.required
      ]],
      maLienthong: ['']
    })
  }

  /**
   * fill các dữ liệu có sắn từ thông tin tài khoản cho hồ sơ
   */
  fillDataUserForRegis(): void {
    let user = this.userLogin;
    if (user) {
      this.editForm.controls.hotenThisinh.setValue(user.firstName + " " + user.lastName);
      this.editForm.controls.ngaySinh.setValue(user.birthday ? new Date(user.birthday) : null);
      this.editForm.controls.soCmnd.setValue(user.soCmnd);
      this.editForm.controls.sdtThisinh.setValue(user.phone);
      this.editForm.controls.emailThisinh.setValue(user.email);
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
        if (hoso.maTrangthai === 0) {
          this.showBtnSave = true;
        }
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
        this.editForm.controls.maDtUutien.setValue((hoso.maDtUutien !== '' && hoso.maDtUutien !== null) ? parseInt(hoso.maDtUutien) : '');
        this.editForm.controls.maKhuvucTs.setValue((hoso.maKhuvucTs !== '' && hoso.maKhuvucTs !== null) ? parseInt(hoso.maKhuvucTs) : '');
        this.editForm.controls.namTotnghiep.setValue((hoso.namTotnghiep !== '' && hoso.namTotnghiep !== null) ? parseInt(hoso.namTotnghiep) : '');
        this.editForm.controls.maLienthong.setValue((hoso.maLienthong !== '' && hoso.maLienthong !== null) ? parseInt(hoso.maLienthong) : '');
        this.lstExam = hoso.lstExam;
        this.lstDinhkem = hoso.lstDinhkem;
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh');
        }, 1000);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Lỗi', 'Không lấy được dữ liệu hồ sơ');
    });
  }

  /**
   * hàm thực hiện valid xã phường khác
   */
  validXaphuongKhac() {
    let flag = false;
    let idXa = this.editForm.controls.maXaphuongTt.value;
    let xaKhac = this.editForm.controls.tenXaphuongTtKhac.value;
    if (idXa === 6578 && xaKhac === '') {
      this.validXaKhac = true;
      flag = true;
    } else {
      this.validXaKhac = false;
    }
    return flag;
  }

  /**
   * hàm lấy danh mục đính kèm khi thêm mới hồ sơ
   */
  getDmDinhkem(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DINHKEM, {}).subscribe(d => {
      this.lstDinhkem = d.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục đính kèm.');
    });
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

  /**
   * lay danh muc so giao duc dao tao
   */
  getDmSoGDDT(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_GDDT, {}).subscribe(d => {
      this.lstSoGddt = d.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục Sở giáo dục và đào tạo.');
    });
  }

  /**
   * hàm lấy danh mục môn học xin bảo lưu điểm
   */
  getDmMonhocBaoluu(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_SUBJECTS, {}).subscribe(d => {
      this.lstMonhocBaoluu = d.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục môn học xin bảo lưu điểm.');
    });
  }

  /**
   * hàm lấy danh mục đối tượng ưu tiên
   */
  getDmDoituongUutien(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DOITUONG_UUTIEN, {}).subscribe(d => {
      this.lstDoituongUutien = d.list;
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục đối tượng ưu tiên.');
    });
  }

  /**
   * hàm lấy danh mục khu vực tuyển sinh
   */
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
   * hàm get danh mục huyện
   */
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

  /**
   * hàm get danh mục xã
   */
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

  /**
   * hàm show hide trường nhập tên xã phường thị trấn khác
   * @param item
   */
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

  /**
   * hàm xử lí sự kiện của chọn đối tượng học sinh
   * @param item
   * @param i
   */
  selectLoaiThisinh(item: any, i: any): void {
    // if (item.loaiThisinh == 2) {
    //   $('#huyenlb_' + i).show();
    //   $('#thptlb_' + i).show();
    // } else {
    //   item.idHuyen = '';
    //   item.lstThpt = [];
    //   item.idThpt = '';
    //   $('#huyenlb_' + i).hide();
    //   $('#thptlb_' + i).hide();
    // }
    if (item.loaiThisinh !== 2) {
      item.idHuyen = '';
      item.lstThpt = [];
      item.idThpt = '';
    }
    if (item.loaiThisinh === "") {
      $('#kieuthisinhlb_' + (i - 1)).show();
    } else {
      $('#kieuthisinhlb_' + (i - 1)).hide();
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 300);
  }

  /**
   * hàm get danh mục huyện của THPT
   * @param item
   * @param i
   */
  getHuyenTHPT(item: any, i: any): void {
    let param = {
      idProvince: item.idTinh
    };
    if (item.idTinh === "") {
      $('#tinhthanhlb_' + i).show();
    } else {
      $('#tinhthanhlb_' + i).hide();
    }
    item.lstHuyen = [];
    item.idHuyen = '';
    item.lstThpt = [];
    item.idThpt = '';
    if (param.idProvince !== '') {
      this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DISTRICT, param).subscribe(d => {
        item.lstHuyen = d.list;
      }, error => {
        this.toastr.error('Lỗi', 'Không lấy được danh mục quận huyện của THPT.');
      });
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 500);
  }

  /**
   * hàm lấy danh mục các trường THPT
   * @param item
   * @param i
   */
  getTHPT(item: any, i: any): void {
    let param = {
      idDistrict: item.idHuyen
    };
    if (item.idHuyen === "") {
      $('#quanhuyenlb_' + i).show();
    } else {
      $('#quanhuyenlb_' + i).hide();
    }
    item.lstThpt = [];
    item.idThpt = '';
    if (param.idDistrict !== '') {
      this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_SCHOOL, param).subscribe(d => {
        item.lstThpt = d.list;
      }, error => {
        this.toastr.error('Lỗi', 'Không lấy được danh mục trường THPT.');
      });
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 500);
  }

  /**
   * Hàm valid Trường THPT
   * @param item
   * @param i
   */
  validTruongThpt(item: any, i: any): void {
    if (item.idThpt === "") {
      $('#truongthptlb_' + i).show();
    } else {
      $('#truongthptlb_' + i).hide();
    }
  }

  /**
   * Lựa chọn bài thi Ngoại ngữ
   */
  clickSelectLang(event: any): void {
    this.editForm.controls.monNgoainguChitiet.setValue('');
    if (event.target.checked) {
      this.isShowMonNgoaingu = false;
    } else {
      this.isShowMonNgoaingu = true;
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 500);
  }

  /**
   * Valid lựa chọn môn thi ngoại ngữ
   */
  validMonNgoainguDki() {
    let flag = false;
    let lang: boolean = this.editForm.controls.monNgoaingu.value;
    if (lang && this.editForm.controls.monNgoainguChitiet.value === "") {
      flag = true;
      this.lbl_errorMonngoainguDki = true;
    } else {
      this.lbl_errorMonngoainguDki = false;
    }
    return flag;
  }

  /**
   * hàm thêm bản ghi vào list môn thi xin bảo lưu
   */
  addMonhocBaoluuDiem(): void {
    let obj = {
      idSubXtn: -1 * new Date().getTime(),
      idHoso: null,
      maMonthi: '',
      tenMonthi: '',
      noiDung: '',
      diemMonthi: ''
    }
    this.lstMonhocXtn.push(obj);
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 500);
  }

  /**
   * xóa bản ghi trong list môn học xin bảo lưu điểm thi
   * @param item
   */
  deleted(item: any): void {
    const initialState = {
      title: 'Thông báo',
      message: 'Bạn chắc chắn muốn xóa môn thi muốn bảo lưu này không?'
    }
    this.bsModalRef = this.modalService.show(ConfirmPopupComponent, { initialState });
    this.bsModalRef.content.event.subscribe(result => {
      if (result === "OK") {
        this.lstMonhocXtn = this.lstMonhocXtn.filter(d => d.idSubXtn != item.idSubXtn);
        this.toastr.success('Thành công', 'Xóa thành công.');
      }
    });
  }

  /**
   * hàm gọi popup thêm mới nguyện vọng xét tuyển
   */
  addNguyenvongXt(item: any): void {
    const initialState = {
      title: item != null ? 'Cập nhật thông tin nguyện vọng' : 'Thêm mới thông tin nguyện vọng',
      item: item
    };
    this.bsModalRef = this.modalService.show(RegisEditPopupComponent, { initialState, class: 'modal-lg' });
    this.bsModalRef.content.event.subscribe(result => {
      if (result !== null) {
        if (result.idExam === null) {
          result.idExam = -1 * new Date().getTime();
          this.lstExam.push(result);
        } else {
          for (let i = 0; i < this.lstExam.length; i++) {
            if (this.lstExam[i].idExam === result.idExam) {
              this.lstExam[i] = result;
              break;
            }
          }
        }
      }
    });
  }

  /**
   * hàm xóa thông tin nguyện vọng
   * @param item
   */
  deleteNguyenvong(item: any): void {
    const initialState = {
      title: 'Thông báo',
      message: 'Bạn chắc chắn muốn xóa nguyện vọng này không?'
    }
    this.bsModalRef = this.modalService.show(ConfirmPopupComponent, { initialState });
    this.bsModalRef.content.event.subscribe(result => {
      if (result === "OK") {
        lodash.remove(this.lstExam, (obj) => {
          return obj.idExam == item.idExam;
        });
        this.toastr.success('Thành công', 'Xóa thành công nguyện vọng.');
      }
    });
  }

  /**
   *  upload file dinh kem
   * @param event
   * @param item
   */
  uploadFile(event: any, item: any): void {
    this.loading = true;
    let files = event.target.files;

    if (!files || files.length <= 0) {
      return;
    }
    // upload 1 file
    let fd = new FormData();
    fd.append("file", files[0]);
    this.api.uploadOneFile(fd).subscribe(data => {
      event.target.value = '';
      this.loading = false;
      if (data.success) {
        item.fileName = data.fileName;
        item.fileGuiid = data.fileCode;
        item.fileUrl = data.filePath;
        let nSize = parseFloat(((data.fileSize) / (1024 * 1024)).toString());
        item.fileSize = Math.round(nSize * 1000) / 1000;
        this.toastr.success('Thành công', data.message);
        $('#dinhkem_valid').hide();
      } else {
        this.toastr.error('Lỗi', data.message);
        this.app.popupAlert('Thông báo', data.message);
      }
    }, error => {
      this.toastr.error('Lỗi', 'Có lỗi phát sinh, vui lòng thực hiện lại!');
      this.loading = false;
    })
  }

  /**
   * hàm thực hiện download file
   * @param item
   */
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

  /**
   * hàm thực hiện xóa file
   * @param item
   */
  deleteFile(item: any): void {
    const initialState = {
      title: 'Thông báo',
      message: 'Bạn chắc chắn muốn xóa tệp đính kèm này không?'
    }
    this.bsModalRef = this.modalService.show(ConfirmPopupComponent, { initialState });
    this.bsModalRef.content.event.subscribe(result => {
      if (result === "OK") {
        item.fileName = null;
        item.fileGuiid = null;
        item.fileUrl = null;
        item.fileSize = null;
        this.toastr.success('Thành công', 'Xóa thành công tệp đính kèm.');
      }
    });
  }

  /**
   * button trở lại
   */
  clickBack(): void {
    this.location.back();
  }

  /**
   * Valid FormData
   */
  validForm() {
    let errorRegis = false;
    this.submitted = true;
    if (this.editForm.invalid) {
      errorRegis = true;
    }
    if (this.validXaphuongKhac()) {
      errorRegis = true;
    }
    for (let i = 0; i < this.lstShool.length; i++) {
      let item = this.lstShool[i];
      if (item.loaiThisinh === "" || item.loaiThisinh === null) {
        errorRegis = true;
        $('#kieuthisinhlb_' + i).show();
      } else {
        $('#kieuthisinhlb_' + i).hide();
      }
      if (item.idTinh === "" || item.idTinh === null) {
        errorRegis = true;
        $('#tinhthanhlb_' + i).show();
      } else {
        $('#tinhthanhlb_' + i).hide();
      }
      if ((item.idHuyen === "" || item.idHuyen === null) && item.loaiThisinh === 2) {
        errorRegis = true;
        $('#quanhuyenlb_' + i).show();
      } else {
        $('#quanhuyenlb_' + i).hide();
      }
      if ((item.idThpt === "" || item.idThpt === null) && item.loaiThisinh === 2) {
        errorRegis = true;
        $('#truongthptlb_' + i).show();
      } else {
        $('#truongthptlb_' + i).hide();
      }
    }
    if (this.validMonNgoainguDki()) {
      errorRegis = true;
    }
    if (!this.lstDinhkem || this.lstDinhkem.length <= 0) {
      errorRegis = true;
      $('#dinhkem_valid').show();
    } else {
      for (let i = 0; i < this.lstDinhkem.length; i++) {
        if (this.lstDinhkem[i].isRequired === 1 && (this.lstDinhkem[i].fileName === "" || this.lstDinhkem[i].fileName === undefined || this.lstDinhkem[i].fileName === null)) {
          errorRegis = true;
          $('#dinhkem_valid').show();
          break;
        } else {
          $('#dinhkem_valid').hide();
        }
      }
    }
    return errorRegis;
  }

  /**
   * Hàm thực hiện lưu hồ sơ
   */
  clickSaveRegis(): void {

    if (this.validForm()) {
      this.toastr.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào.');
      this.app.popupAlert('Thông báo', 'Bạn cần nhập đủ dữ liệu các trường BẮT BUỘC <span class="msg-invalid">(*)</span>')
      return;
    }

    this.loading = true;
    let maSoGddt = this.editForm.controls.maSoGddt.value;
    let soGddt = lodash.filter(this.lstSoGddt, (d) => {
      return d.maSoGddt === maSoGddt;
    })[0];
    let regisData = {
      idHoso: this.idRegis ? this.idRegis : null,
      maHoso: this.editForm.controls.maHoso.value,
      userId: this.userLogin.id,
      maTrangthai: null,
      tenTrangthai: this.editForm.controls.tenTrangthai.value,
      ngayTao: this.editForm.controls.ngayTao.value ? this.editForm.controls.ngayTao.value : new Date(),
      ngayGui: null,
      ngayPheduyet: null,
      hoatdong: null,
      tenSoGddt: soGddt ? soGddt.tenSoGddt : "",
      maSoGddt: maSoGddt,
      hotenThisinh: this.editForm.controls.hotenThisinh.value,
      maGioitinh: this.editForm.controls.maGioitinh.value,
      tenGioitinh: this.editForm.controls.maGioitinh.value === 0 ? "Nam" : "Nữ",
      ngaySinh: this.editForm.controls.ngaySinh.value,
      maNoisinh: this.editForm.controls.maNoisinh.value,
      noiSinh: this.editForm.controls.maNoisinh.value ? lodash.filter(this.lstProvince, (d) => {
        return d.provinceCode === this.editForm.controls.maNoisinh.value;
      })[0].provinceName : "",
      danToc: this.editForm.controls.danToc.value,
      isNational: this.editForm.controls.isNational.value ? 1 : 0,
      soCmnd: this.editForm.controls.soCmnd.value,
      maTinhthanhTt: this.editForm.controls.maTinhthanhTt.value,
      tenTinhthanhTt: this.editForm.controls.maTinhthanhTt.value ? lodash.filter(this.lstProvince, (d) => {
        return d.id === this.editForm.controls.maTinhthanhTt.value;
      })[0].provinceName : "",
      maQuanhuyenTt: this.editForm.controls.maQuanhuyenTt.value,
      tenQuanhuyenTt: this.editForm.controls.maQuanhuyenTt.value ? lodash.filter(this.lstDistrict, (d) => {
        return d.id === this.editForm.controls.maQuanhuyenTt.value;
      })[0].districtName : "",
      maXaphuongTt: this.editForm.controls.maXaphuongTt.value,
      tenXaphuongTt: this.editForm.controls.maXaphuongTt.value ? lodash.filter(this.lstWard, (d) => {
        return d.id === this.editForm.controls.maXaphuongTt.value;
      })[0].wardsName : "",
      tenXaphuongTtKhac: this.editForm.controls.tenXaphuongTtKhac.value,
      hkttKvi: this.editForm.controls.hkttKvi.value ? 1 : 0,
      hkttDbkk: this.editForm.controls.hkttDbkk.value ? 1 : 0,
      lstShool: this.lstShool,
      tenLop12: this.editForm.controls.tenLop12.value,
      sdtThisinh: this.editForm.controls.sdtThisinh.value,
      emailThisinh: this.editForm.controls.emailThisinh.value,
      thongtinLienhe: this.editForm.controls.thongtinLienhe.value,
      xettuyenDhcd: this.editForm.controls.xettuyenDhcd ? 1 : 0,
      chuongtrinhHocthisinh: this.editForm.controls.chuongtrinhHocthisinh.value,
      thisinhTudoTn: this.editForm.controls.thisinhTudoTn.value,
      maNoiDkdt: this.editForm.controls.maNoiDkdt.value,
      tenNoiDkdt: this.editForm.controls.tenNoiDkdt.value,
      monToan: this.editForm.controls.monToan.value ? 1 : 0,
      monNguvan: this.editForm.controls.monNguvan.value ? 1 : 0,
      monNgoaingu: this.editForm.controls.monNgoaingu.value ? 1 : 0,
      monNgoainguChitiet: this.editForm.controls.monNgoainguChitiet.value,
      monKhtn: this.editForm.controls.monKhtn.value ? 1 : 0,
      monKhxh: this.editForm.controls.monKhxh.value ? 1 : 0,
      monVatly: this.editForm.controls.monVatly.value ? 1 : 0,
      monHoahoc: this.editForm.controls.monHoahoc.value ? 1 : 0,
      monSinhhoc: this.editForm.controls.monSinhhoc.value ? 1 : 0,
      monLichsu: this.editForm.controls.monLichsu.value ? 1 : 0,
      monDialy: this.editForm.controls.monDialy.value ? 1 : 0,
      monGdcd: this.editForm.controls.monGdcd.value ? 1 : 0,
      chungchiNgoaingu: this.editForm.controls.chungchiNgoaingu.value,
      diemthiChungchiNn: this.editForm.controls.diemthiChungchiNn.value,
      lstMonhocXtn: this.lstMonhocXtn,
      maDtUutien: this.editForm.controls.maDtUutien.value,
      tenDtUutien: this.editForm.controls.maDtUutien.value ? lodash.filter(this.lstDoituongUutien, (d) => {
        return d.id === this.editForm.controls.maDtUutien.value;
      })[0].tenDoituong : "",
      maKhuvucTs: this.editForm.controls.maKhuvucTs.value,
      tenKhuvucTs: this.editForm.controls.maKhuvucTs.value ? lodash.filter(this.lstKhuvucTs, (d) => {
        return d.id === this.editForm.controls.maKhuvucTs.value;
      })[0].tenKhuvuc : "",
      namTotnghiep: this.editForm.controls.namTotnghiep.value,
      maLienthong: this.editForm.controls.maLienthong.value,
      tenLienthong: this.editForm.controls.maLienthong.value ? lodash.filter(this.lstXettuyenLienthong, (d) => {
        return d.id === this.editForm.controls.maLienthong.value;
      })[0].name : "",
      lstExam: this.lstExam,
      lstDinhkem: this.lstDinhkem
    }

    let url = (regisData.idHoso === null || regisData.idHoso <= 0) ? API_CONSTANT.REGISTRATION.CREATE : API_CONSTANT.REGISTRATION.UPDATE;
    let msg: string = regisData.idHoso > 0 ? 'Cập nhật hồ sơ thành công.' : 'Tạo mới hồ sơ thành công.';
    this.api.postDataToken(url, regisData, {}).subscribe(d => {
      this.loading = false;
      if (d.data !== null) {
        this.toastr.success('Thành công', msg);
        this.clickBack();
      } else {
        this.toastr.error('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại.');
        this.app.popupAlert('Thông báo', 'Có lỗi xảy ra, vui lòng thực hiện lại.')
      }
    }, error => {
      this.toastr.error('Lỗi', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.app.popupAlert('Thông báo', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.loading = false;
    });

  }

  /**
   * Hàm thực hiện gửi hồ sơ
   */
  clickSendRegis(): void {
    if (this.validForm()) {
      this.toastr.warning('Cảnh báo', 'Kiểm tra lại dữ liệu nhập vào.');
      this.app.popupAlert('Thông báo', 'Bạn cần nhập đủ dữ liệu các trường BẮT BUỘC <span class="msg-invalid">(*)</span>')
      return;
    }

    this.loading = true;
    let maSoGddt = this.editForm.controls.maSoGddt.value;
    let soGddt = lodash.filter(this.lstSoGddt, (d) => {
      return d.maSoGddt === maSoGddt;
    })[0];
    let regisData = {
      idHoso: this.idRegis ? this.idRegis : null,
      maHoso: this.editForm.controls.maHoso.value,
      userId: this.userLogin.id,
      maTrangthai: null,
      tenTrangthai: this.editForm.controls.tenTrangthai.value,
      ngayTao: this.editForm.controls.ngayTao.value ? this.editForm.controls.ngayTao.value : new Date(),
      ngayGui: null,
      ngayPheduyet: null,
      hoatdong: null,
      tenSoGddt: soGddt ? soGddt.tenSoGddt : "",
      maSoGddt: maSoGddt,
      hotenThisinh: this.editForm.controls.hotenThisinh.value,
      maGioitinh: this.editForm.controls.maGioitinh.value,
      tenGioitinh: this.editForm.controls.maGioitinh.value === 0 ? "Nam" : "Nữ",
      ngaySinh: this.editForm.controls.ngaySinh.value,
      maNoisinh: this.editForm.controls.maNoisinh.value,
      noiSinh: this.editForm.controls.maNoisinh.value ? lodash.filter(this.lstProvince, (d) => {
        return d.provinceCode === this.editForm.controls.maNoisinh.value;
      })[0].provinceName : "",
      danToc: this.editForm.controls.danToc.value,
      isNational: this.editForm.controls.isNational.value ? 1 : 0,
      soCmnd: this.editForm.controls.soCmnd.value,
      maTinhthanhTt: this.editForm.controls.maTinhthanhTt.value,
      tenTinhthanhTt: this.editForm.controls.maTinhthanhTt.value ? lodash.filter(this.lstProvince, (d) => {
        return d.id === this.editForm.controls.maTinhthanhTt.value;
      })[0].provinceName : "",
      maQuanhuyenTt: this.editForm.controls.maQuanhuyenTt.value,
      tenQuanhuyenTt: this.editForm.controls.maQuanhuyenTt.value ? lodash.filter(this.lstDistrict, (d) => {
        return d.id === this.editForm.controls.maQuanhuyenTt.value;
      })[0].districtName : "",
      maXaphuongTt: this.editForm.controls.maXaphuongTt.value,
      tenXaphuongTt: this.editForm.controls.maXaphuongTt.value ? lodash.filter(this.lstWard, (d) => {
        return d.id === this.editForm.controls.maXaphuongTt.value;
      })[0].wardsName : "",
      tenXaphuongTtKhac: this.editForm.controls.tenXaphuongTtKhac.value,
      hkttKvi: this.editForm.controls.hkttKvi.value ? 1 : 0,
      hkttDbkk: this.editForm.controls.hkttDbkk.value ? 1 : 0,
      lstShool: this.lstShool,
      tenLop12: this.editForm.controls.tenLop12.value,
      sdtThisinh: this.editForm.controls.sdtThisinh.value,
      emailThisinh: this.editForm.controls.emailThisinh.value,
      thongtinLienhe: this.editForm.controls.thongtinLienhe.value,
      xettuyenDhcd: this.editForm.controls.xettuyenDhcd ? 1 : 0,
      chuongtrinhHocthisinh: this.editForm.controls.chuongtrinhHocthisinh.value,
      thisinhTudoTn: this.editForm.controls.thisinhTudoTn.value,
      maNoiDkdt: this.editForm.controls.maNoiDkdt.value,
      tenNoiDkdt: this.editForm.controls.tenNoiDkdt.value,
      monToan: this.editForm.controls.monToan.value ? 1 : 0,
      monNguvan: this.editForm.controls.monNguvan.value ? 1 : 0,
      monNgoaingu: this.editForm.controls.monNgoaingu.value ? 1 : 0,
      monNgoainguChitiet: this.editForm.controls.monNgoainguChitiet.value,
      monKhtn: this.editForm.controls.monKhtn.value ? 1 : 0,
      monKhxh: this.editForm.controls.monKhxh.value ? 1 : 0,
      monVatly: this.editForm.controls.monVatly.value ? 1 : 0,
      monHoahoc: this.editForm.controls.monHoahoc.value ? 1 : 0,
      monSinhhoc: this.editForm.controls.monSinhhoc.value ? 1 : 0,
      monLichsu: this.editForm.controls.monLichsu.value ? 1 : 0,
      monDialy: this.editForm.controls.monDialy.value ? 1 : 0,
      monGdcd: this.editForm.controls.monGdcd.value ? 1 : 0,
      chungchiNgoaingu: this.editForm.controls.chungchiNgoaingu.value,
      diemthiChungchiNn: this.editForm.controls.diemthiChungchiNn.value,
      lstMonhocXtn: this.lstMonhocXtn,
      maDtUutien: this.editForm.controls.maDtUutien.value,
      tenDtUutien: this.editForm.controls.maDtUutien.value ? lodash.filter(this.lstDoituongUutien, (d) => {
        return d.id === this.editForm.controls.maDtUutien.value;
      })[0].tenDoituong : "",
      maKhuvucTs: this.editForm.controls.maKhuvucTs.value,
      tenKhuvucTs: this.editForm.controls.maKhuvucTs.value ? lodash.filter(this.lstKhuvucTs, (d) => {
        return d.id === this.editForm.controls.maKhuvucTs.value;
      })[0].tenKhuvuc : "",
      namTotnghiep: this.editForm.controls.namTotnghiep.value,
      maLienthong: this.editForm.controls.maLienthong.value,
      tenLienthong: this.editForm.controls.maLienthong.value ? lodash.filter(this.lstXettuyenLienthong, (d) => {
        return d.id === this.editForm.controls.maLienthong.value;
      })[0].name : "",
      lstExam: this.lstExam,
      lstDinhkem: this.lstDinhkem
    }

    this.api.postDataToken(API_CONSTANT.REGISTRATION.SEND_REGIS, regisData, {}).subscribe(d => {
      this.loading = false;
      if (d.data.success) {
        this.toastr.success('Thành công', d.data.message);
        this.clickBack();
      } else {
        this.toastr.error('Lỗi', d.data.message);
        this.app.popupAlert('Thông báo', d.data.message);
      }
    }, error => {
      this.toastr.error('Lỗi', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.app.popupAlert('Thông báo', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.loading = false;
    });
  }

}
