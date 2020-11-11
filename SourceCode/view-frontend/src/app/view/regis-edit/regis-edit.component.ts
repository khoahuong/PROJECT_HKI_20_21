import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { ConfirmPopupComponent } from 'src/app/common/confirm-popup/confirm-popup.component';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';
declare var $: any;
@Component({
  selector: 'app-regis-edit',
  templateUrl: './regis-edit.component.html',
  styleUrls: ['./regis-edit.component.scss']
})
export class RegisEditComponent implements OnInit {

  loading: boolean = false;

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

  isShowXaphuong: boolean = true;
  isShowMonNgoaingu: boolean = true;

  bsModalRef: BsModalRef;
  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
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
    this.getProvince();
    this.getDmSoGDDT();
    this.getDmMonhocBaoluu();
    this.getDmDoituongUutien();
    this.getDmKhuvucTs();
    this.getListYear();
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
    if (param.idProvince === '') {
      this.lstWard = [];
      this.editForm.controls.maXaphuongTt.setValue('');
    } else {
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
    if (param.idProvince === '') {
      item.lstThpt = [];
      item.idThpt = '';
    } else {
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
    console.log(this.editForm.controls.monNgoaingu.value);
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
      message: 'Bạn muốn xóa bản ghi này không?'
    }
    this.bsModalRef = this.modalService.show(ConfirmPopupComponent, { initialState });
    this.bsModalRef.content.event.subscribe(result => {
      if (result == "OK") {
        this.lstMonhocXtn = this.lstMonhocXtn.filter(d => d.idSubXtn != item.idSubXtn);
        this.toastr.success('Thành công', 'Xóa thành công bản ghi.');
      }
    });
  }
}
