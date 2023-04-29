import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<InfoBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService, private route: Router
  ) {
  }

  ngOnInit() {
   
  }
  // routeToTest(){
  //   this.spinner.show(); // show the spinner
  //   setTimeout(() => {
  //     this.spinner.hide(); // hide the spinner after some time
  //   }, 2000);
  //   this.route.navigate(['/test'])
  // }
  
}
