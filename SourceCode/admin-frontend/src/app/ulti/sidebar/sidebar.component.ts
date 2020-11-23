import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any = [];
  public isCollapsed = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

}

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/edu/home', title: 'Trang chủ', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/edu/userinfo', title: 'Thông tin tài khoản', icon: 'ni-single-02 text-yellow', class: '' },
];
