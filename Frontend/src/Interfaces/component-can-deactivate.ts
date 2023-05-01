import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoBoxComponent } from 'src/app/info-box/info-box.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard {
    constructor(private dialog : MatDialog){};
    exitDialog(): Observable<boolean> {
        const ref: MatDialogRef<InfoBoxComponent> = this.dialog.open(
          InfoBoxComponent,
          {
            data: {
              message: 'Testi iptal etmek istediğinize emin misiniz?',
              exit: 'İptal et ',
              confirm: 'Teste Devam Et',
              function: () => ref.close(false)
            },
          }
        );
        return ref.afterClosed();
      }
      
      canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
        // if there are no pending changes, just allow deactivation; else confirm first
        return component.canDeactivate() ?
          true :
          this.exitDialog()
      }
      
}
