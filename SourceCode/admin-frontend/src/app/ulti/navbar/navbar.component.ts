import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTES } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public listTitles: any = [];
  public location: Location;
  userLogin: any;
  loading: boolean = false;

  constructor(
    location: Location,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.location = location;
  }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var title = this.location.prepareExternalUrl(this.location.path());
    for (var i = 0; i < this.listTitles.length; i++) {
      if (title.includes(this.listTitles[i].path)) {
        return this.listTitles[i].title;
      }
    }
    return 'Trang chủ';
  }

  clickLogout(): void {
    this.loading = true;
    if (typeof (Storage) !== "undefined") {
      this.loading = false;
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      this.loading = false;
      this.toastr.warning('Đăng xuất thất bại.', 'Cảnh báo');
    }
  }

}
