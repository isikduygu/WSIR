import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }
  confirmDialog() {
    const ref: MatDialogRef<InfoBoxComponent> = this.dialog.open(
      InfoBoxComponent,
      {
        data: {
          info: [
            '70 sorunun her biri için işaretleme yapın.',
            'Sizi en doğru şekilde tanımladığını düşündüğünüz yanıtı seçin',
            'Her iki cevaba da katılsanız bile, daha fazla katıldığınızı işaretleyin.',
            'Olmak istediğiniz gibi değil, gerçekte olduğunuz gibi cevap veriniz.',
            'Bu testte doğru veya yanlış cevap yoktur.'
          ],
          exit: 'İptal',
          confirm: 'Testi Başlat',
          function: this.routeToTest.bind(this)
        },
      }
    );
  }
  routeToTest(){
    // this.spinner.show(); // show the spinner
    // setTimeout(() => {
    //   this.spinner.hide(); // hide the spinner after some time
    // }, 2000);
    this.router.navigate(['/test'])
  }
}