import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent implements OnInit {

  typeViewer: any = "google";
  // urlFile: any = "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx";
  urlFile: any = "";
  constructor() { }

  ngOnInit(): void {
  }

}
