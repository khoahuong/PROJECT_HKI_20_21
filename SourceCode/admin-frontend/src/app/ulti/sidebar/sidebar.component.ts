import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any = [];
  public isCollapsed = true;
  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
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

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/edu/home', title: 'Trang chủ', icon: 'ni ni-tv-2 text-primary', class: '' },
  { path: '/edu/registration', title: 'Hồ sơ tuyển sinh', icon: 'fa fa-book text-blue', class: '' },
  { path: '/edu/history', title: 'Lịch sử hoạt động', icon: 'ni ni-bullet-list-67 text-info', class: '' },
  { path: '/edu/userinfo', title: 'Thông tin tài khoản', icon: 'ni ni-single-02 text-yellow', class: '' },
  { path: '/edu/document', title: 'Hướng dẫn sử dụng', icon: 'ni ni ni-books text-green', class: '' },
];
