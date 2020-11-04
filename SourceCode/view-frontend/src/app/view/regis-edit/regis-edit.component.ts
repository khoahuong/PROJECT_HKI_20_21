import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.data = params['data'];
    });
    this.titleEdit = this.data != "null" ? "Cập nhật thông tin hồ sơ" : "Thêm mới thông tin hồ sơ";
    this.buildForm();
  }

  buildForm(): void {
    this.editForm = this.fb.group({
      maHoso: ['', []],
      tenTrangthai: ['', []],
      ngayTao: ['', []]
    })
  }

}
