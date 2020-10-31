import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-regis-edit',
  templateUrl: './regis-edit.component.html',
  styleUrls: ['./regis-edit.component.scss']
})
export class RegisEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let data = params['data'];
       console.log(params);
    });
  }

}
