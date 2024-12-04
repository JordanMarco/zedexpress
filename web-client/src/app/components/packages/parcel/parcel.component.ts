import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ParcelFormComponent } from '../components/parcel-form/parcel-form.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, Subject } from 'rxjs';
import { ColisService } from 'src/app/shared/rest-services/colis.service';
import { IColis } from 'src/app/shared/models/colis';
import { PaymentService } from 'src/app/shared/rest-services/payment.service';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss'],
})
export class ParcelComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'client',
    'recipient',
    'name',
    'departureDate',
    'entryDate',
    'expectedArrivalDate',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<IColis>();
  totalParcels = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  intervale!: number;

  constructor(
    private colisService: ColisService,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.$inputSubject
      .pipe(debounceTime(1000)) // Adjust the debounce time to your needs (e.g., 300ms)
      .subscribe((searchValue) => {
        this.applyFilter();
      });
    this.loadParcels();
  }

  loadParcels() {
    this.isLoading = true;
    this.colisService
      .index(
        (this.paginator?.pageIndex ?? 0) + 1,
        this.paginator?.pageSize || 10,
        this.searchValue
      )
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.totalParcels = response.total;
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error(this.translate.instant('ERRORS.LOAD_PARCELS'));
          this.isLoading = false;
        },
      });
  }

  openParcelForm(colis?: IColis) {
    const dialogRef = this.dialog.open(ParcelFormComponent, {
      width: '800px',
      data: colis,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadParcels();
      }
    });
  }

  previewParcel(colis: IColis) {
    this.dialog.open(ParcelFormComponent, {
      width: '800px',
      data: { ...colis, readonly: true },
    });
  }

  sendParcel(colis: IColis) {
    this.isLoading = true;
    this.colisService.send(colis.id!).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.PARCEL_SENT'));
        this.loadParcels();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.SEND_PARCEL'));
        this.isLoading = false;
      },
    });
  }

  confirmDelete(colis: IColis) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { name: colis.nom },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && colis.id) {
        this.deleteParcel(colis.id);
      }
    });
  }

  private deleteParcel(id: number) {
    this.isLoading = true;
    this.colisService.destroy(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.PARCEL_DELETED'));
        this.loadParcels();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.DELETE_PARCEL'));
        this.isLoading = false;
      },
    });
  }

  navigateToPickup() {
    this.router.navigate(['/packages/pickup']);
  }

  search(event: Event): void {
    this.searchValue = event.target
      ? (event.target as HTMLInputElement).value
      : '';
    this.$inputSubject.next(this.searchValue);
  }

  applyFilter() {
    this.paginator.firstPage();
    this.loadParcels();
  }

  pay(colis: IColis){
    this.paymentService.pay(colis.id).subscribe({
      next: (res: any) => {
        if(res && res.url){
          window.open(res.url, '_blank');
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // verifyStatus(colis: IColis){
  //   this.intervale = setInterval(() => this.getPayment(colis.id), 1000);
  // }

  getPayment(id: number)
  {
    this.paymentService.checkStatus(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res && res.status !== 'pending'){
          this.loadParcels();
          clearInterval(this.intervale);
        }
      },
      complete: () => {
      }
    });
  }

}
