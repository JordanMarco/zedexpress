import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { IColis } from 'src/app/shared/models/colis';
import { ColisService } from 'src/app/shared/rest-services/colis.service';
import { ParcelFormComponent } from '../packages/components/parcel-form/parcel-form.component';
import { PaymentService } from 'src/app/shared/rest-services/payment.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
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

  constructor(
    private colisService: ColisService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService,
    private paymentService: PaymentService,
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
      .tracking(
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

  previewParcel(colis: IColis) {
    this.dialog.open(ParcelFormComponent, {
      width: '800px',
      data: { ...colis, readonly: true },
    });
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
}
