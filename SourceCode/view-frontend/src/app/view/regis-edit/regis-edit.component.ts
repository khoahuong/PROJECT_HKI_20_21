import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/api/api.service';
import { API_CONSTANT } from 'src/app/common/constant/apiConstant';
import { CONSTANT } from 'src/app/common/constant/constant';
import * as _ from 'lodash';
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

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.lstGender = CONSTANT.GENDER;
    this.activeRoute.params.subscribe(params => {
      this.data = params['data'];
    });
    this.titleEdit = this.data != "null" ? "Cập nhật thông tin hồ sơ" : "Thêm mới thông tin hồ sơ";
    this.buildForm();
    this.getProvince();
  }

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
      maQuanhuyenTt: ['', []]
    })
  }

  getProvince(): void {
    this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_PROVINCE, {}).subscribe(data => {
      this.lstProvince = data.list;
      console.log(this.lstProvince);
    }, error => {
      this.toastr.error('Lỗi', 'Không lấy được danh mục tỉnh thành.');
    });
  }

  getDistrictHKTT(): void {
    this.loading = true;
    let param = {
      idProvince: this.editForm.controls.maTinhthanhTt.value
    };
    this.lstDistrict = [];
    this.editForm.controls.maQuanhuyenTt.setValue('');
    if (param.idProvince === '') {
      this.loading = false;
      // todo
    } else {
      this.loading = false;
      this.api.getDataToken(API_CONSTANT.STATUS.GET_DATA_DISTRICT, param).subscribe(d => {
        this.lstDistrict = d.list;
        $('#col1').on('change', '#val1', function () {
          $('#val1').selectpicker('refresh');
        });
      }, error => {
        this.toastr.error('Lỗi', 'Không lấy được danh mục quận huyện.');
      });
    }
  }

}
