import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public focus;
  public listTitles: any = [];
  public location: Location;

  constructor(
    location: Location
  ) {
    this.location = location;
  }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var title = this.location.prepareExternalUrl(this.location.path());
    for (var i = 0; i < this.listTitles.length; i++) {
      if (title.endsWith(this.listTitles[i].path)) {
        return this.listTitles[i].title;
      }
    }
    return 'Trang chủ';
  }

}
