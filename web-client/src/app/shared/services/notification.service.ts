import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastPosition } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public success(message: string): void {
    this.toastr.success(message, undefined, {
      closeButton: true,
      positionClass: ToastPosition.topRight,
    });
  }

  public warning(message: string): void {
    this.toastr.warning(message, undefined, {
      closeButton: true,
      positionClass: ToastPosition.topRight,
      timeOut: 15000,
    });
  }

  public danger(message: string): void {
    this.toastr.error(message, undefined, {
      closeButton: true,
      positionClass: ToastPosition.topRight,
    });
  }

  public info(message: string): void {
    this.toastr.info(message, undefined, {
      closeButton: true,
      positionClass: ToastPosition.topRight,
      timeOut: 10000,
    });
  }
}
