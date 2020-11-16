import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  data: any;

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

  bsModalRef: BsModalRef;

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
    this.activeRoute.params.subscribe(params => {
      this.data = params['data'];
    });
    this.titleEdit = this.data != "null" ? "Cập nhật thông tin hồ sơ" : "Thêm mới thông tin hồ sơ";
    this.buildForm();
    if (this.data == "null") {
      this.getDmDinhkem();
    }
    this.getProvince();
    this.getDmSoGDDT();
    this.getDmMonhocBaoluu();
    this.getDmDoituongUutien();
    this.getDmKhuvucTs();
    this.getListYear();
    this.refreshSelect();
  }

  refreshSelect(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }
  /**
   * khoi tao form
   */
  buildForm(): void {
    this.editForm = this.fb.group({
      maHoso: ['', []],
      tenTrangthai: ['', []],
      ngayTao: ['', []],
      ngayGui: ['', []],
      hotenThisinh: ['', []],
      maGioitinh: ['', []],
      ngaySinh: ['', []],
      maNoisinh: ['', []],
      danToc: ['', []],
      isNational: [''],
      soCmnd: ['', []],
      maTinhthanhTt: ['', []],
      maQuanhuyenTt: ['', []],
      maXaphuongTt: ['', []],
      tenXaphuongTtKhac: ['', []],
      hkttKvi: [''],
      hkttDbkk: [''],
      sdtThisinh: ['', []],
      emailThisinh: ['', []],
      thongtinLienhe: ['', []],
      tenLop12: ['', []],
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
      }, 100);
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
      idProvince: this.editForm.controls.maTinhthanhTt.value
    };
    this.lstDistrict = [];
    this.editForm.controls.maQuanhuyenTt.setValue('');
    this.lstWard = [];
    this.editForm.controls.maXaphuongTt.setValue('');
    if (param.idProvince !== '') {
      this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DISTRICT, param).subscribe(d => {
        this.lstDistrict = d.list;
      }, error => {
        this.toastr.error('Lỗi', 'Không lấy được danh mục quận huyện.');
      });
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses after 0.1s
    }, 100);
  }

  /**
   * hàm get danh mục xã
   */
  getWardHKTT(): void {
    let param = {
      idDistrict: this.editForm.controls.maQuanhuyenTt.value
    };
    this.lstWard = [];
    this.editForm.controls.maXaphuongTt.setValue('');
    if (param.idDistrict !== '') {
      this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_WARD, param).subscribe(d => {
        this.lstWard = d.list;
        this.lstWard.push({ id: 6578, wardsName: "Xã, phường, thị trấn khác" });
      }, error => {
        this.toastr.error('Lỗi', 'Không lấy được danh mục xã, phường.');
      });
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }

  /**
   * hàm show hide trường nhập tên xã phường thị trấn khác
   * @param item
   */
  getWardHKTTKhac(): void {
    // let idWard = item.target.value;
    let idWard = this.editForm.controls.maXaphuongTt.value;
    if (idWard == 6578) {
      this.isShowXaphuong = false;
    } else {
      this.isShowXaphuong = true;
    }
  }

  selectLoaiThisinh(item: any, i: any): void {
    if (item.loaiThisinh == 2) {
      $('#huyenlb_' + i).show();
      $('#thptlb_' + i).show();
    } else {
      item.idHuyen = '';
      item.lstThpt = [];
      item.idThpt = '';
      $('#huyenlb_' + i).hide();
      $('#thptlb_' + i).hide();
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }

  /**
   * hàm get danh mục huyện của THPT
   * @param item
   */
  getHuyenTHPT(item: any): void {
    let param = {
      idProvince: item.idTinh
    };
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
    }, 100);
  }

  /**
   * hàm lấy danh mục các trường THPT
   * @param item
   */
  getTHPT(item: any): void {
    let param = {
      idDistrict: item.idHuyen
    };
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
    }, 100);
  }

  clickSelectLang(event: any): void {
    this.editForm.controls.monNgoainguChitiet.setValue('');
    if (event.target.checked) {
      this.isShowMonNgoaingu = false;
    } else {
      this.isShowMonNgoaingu = true;
    }
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
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
    }, 100);
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
      if (result == "OK") {
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
      if (result == "OK") {
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
      if (result == "OK") {
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

  clickSaveRegis(): void {
    this.loading = true;
    let maSoGddt = this.editForm.controls.maSoGddt.value;
    let soGddt = lodash.filter(this.lstSoGddt, (d) => {
      return d.maSoGddt === maSoGddt;
    })[0];
    let regisData = {
      idHoso: null,
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
      tenGioitinh: this.editForm.controls.maGioitinh.value == 0 ? "Nam" : "Nữ",
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
    debugger;

    let url = (regisData.idHoso == null || regisData.idHoso <= 0) ? API_CONSTANT.REGISTRATION.CREATE : API_CONSTANT.REGISTRATION.UPDATE;
    this.api.postDataToken(url, regisData, {}).subscribe(d => {
      this.loading = false;
      if (d.success == true) {
        this.toastr.success('Thành công', 'Tạo mới hồ sơ thành công.');
        this.clickBack();
      }
    }, error => {
      this.toastr.error('Lỗi', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.app.popupAlert('Thông báo', 'Hệ thống đang có lỗi, vui lòng thử lại sau.');
      this.loading = false;
    });

  }

  clickSendRegis(): void {

  }
}
