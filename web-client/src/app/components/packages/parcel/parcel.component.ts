import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ParcelService } from 'src/app/shared/rest-services/parcel.service'; 
import { Parcel } from 'src/app/shared/models/parcel.model'; 
import { ParcelFormComponent } from '../components/parcel-form/parcel-form.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit{
  displayedColumns: string[] = [
    'id', 'client', 'recipient', 'name', 'departureDate', 
    'entryDate', 'expectedArrivalDate', 'status', 'actions'
  ];
  dataSource = new MatTableDataSource<Parcel>([{
    id: 1,
    name: 'baudouin',
    client: 'meli',
    recipient: 'jean',
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    quantity: 0,
    description: '',
    fragility: 'Fragile',
    category: 'verre',
    price: 0,
    agency: '',
    entryDate: new Date,
    departureDate: new Date,
    expectedArrivalDate: new Date,
    status: 'PENDING'
  }]);
  totalParcels = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parcelService: ParcelService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.$inputSubject
    .pipe(debounceTime(1000)) // Adjust the debounce time to your needs (e.g., 300ms)
    .subscribe(searchValue => {
      this.applyFilter()
    });
    this.loadParcels();
  }

  loadParcels() {
    this.isLoading = true;
    this.parcelService.getParcels({
      page: this.paginator?.pageIndex || 0,
      pageSize: this.paginator?.pageSize || 10,
      search: this.searchValue
    }).subscribe({
      next: (response) => {
        this.dataSource.data = response.parcels;
        this.totalParcels = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_PARCELS'));
        this.isLoading = false;
      }
    });
  }

  openParcelForm(parcel?: Parcel) {
    const dialogRef = this.dialog.open(ParcelFormComponent, {
      width: '800px',
      data: parcel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadParcels();
      }
    });
  }

  previewParcel(parcel: Parcel) {
    this.dialog.open(ParcelFormComponent, {
      width: '800px',
      data: { ...parcel, readonly: true }
    });
  }

  sendParcel(parcel: Parcel) {
    this.isLoading = true;
    this.parcelService.sendParcel(parcel.id!).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.PARCEL_SENT'));
        this.loadParcels();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.SEND_PARCEL'));
        this.isLoading = false;
      }
    });
  }

  confirmDelete(parcel: Parcel) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { name: parcel.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && parcel.id) {
        this.deleteParcel(parcel.id);
      }
    });
  }

  private deleteParcel(id: number) {
    this.isLoading = true;
    this.parcelService.deleteParcel(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.PARCEL_DELETED'));
        this.loadParcels();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.DELETE_PARCEL'));
        this.isLoading = false;
      }
    });
  }

  navigateToPickup() {
    this.router.navigate(['/packages/pickup']);
  }

  search(event: Event): void {
    this.searchValue = event.target ? (event.target as HTMLInputElement).value : '';
    this.$inputSubject.next(this.searchValue);
  }

  applyFilter() {
    this.paginator.firstPage();
    this.loadParcels();
  }
}
