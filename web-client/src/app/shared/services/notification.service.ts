import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { toastPosition } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public success(message: string): void {
    this.toastr.success(message, undefined, {
      closeButton: true,
      positionClass: toastPosition.topRight,
    });
  }

  public warning(message: string): void {
    this.toastr.warning(message, undefined, {
      closeButton: true,
      positionClass: toastPosition.topRight,
      timeOut: 15000,
    });
  }

  public danger(message: string): void {
    this.toastr.error(message, undefined, {
      closeButton: true,
      positionClass: toastPosition.topRight,
    });
  }

  public info(message: string): void {
    this.toastr.info(message, undefined, {
      closeButton: true,
      positionClass: toastPosition.topRight,
      timeOut: 10000,
    });
  }
}
