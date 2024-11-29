import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ComponentType } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  openModal(component: ComponentType<unknown>, options: any): Observable<any> {
    options = {
      ...{
        width: window.innerWidth > 800 ? '800px' : window.innerWidth + 'px',
        height:
          window.innerWidth > 800 && window.innerHeight > 600
            ? '600px'
            : window.innerHeight + 'px',
        maxWidth: '98vw',
        maxHeight: '94vh',
        disableClose: false,
        panelClass: ['default_modal'],
        backdropClass: ['default_backdrop', 'popup_backdrop'],

        data: {},
      },
      ...options,
    };
    const dialogRef = this.dialog.open(component, options);

    return dialogRef.afterClosed();
  }

  closeAllModals() {
    this.dialog.closeAll();
  }
}
