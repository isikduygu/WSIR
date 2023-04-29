import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WSIR';

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  routeToPage(page: any) {
    if (this.router.url == '/test') {
      this.exitDialog();
    } else {
      if (page == 'anasayfa') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/', page]);
      }
    }
  }
  confirmDialog() {
    if (this.router.url == '/test') {
      this.exitDialog();
    }else{
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
  }
  routeToTest(){
    this.spinner.show(); // show the spinner
    setTimeout(() => {
      this.spinner.hide(); // hide the spinner after some time
    }, 2000);
    this.router.navigate(['/test'])
  }

  exitDialog() {
    const ref: MatDialogRef<InfoBoxComponent> = this.dialog.open(
      InfoBoxComponent,
      {
        data: {
          message: 'Testi iptal etmek istediğinize emin misiniz?',
          exit: 'Teste Devam Et',
          confirm: 'İptal et',
          function: this.refreshPage.bind(this)
        },
      }
    );
  }
  refreshPage() {
    this.router.navigate(['/'])
  }
}
