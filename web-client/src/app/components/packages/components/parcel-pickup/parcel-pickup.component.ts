import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ParcelPickupService } from 'src/app/shared/models/parcel-pickup.service';
import { ParcelPickup } from 'src/app/shared/models/parcel-pickup.model';


@Component({
  selector: 'app-parcel-pickup',
  templateUrl: './parcel-pickup.component.html',
  styleUrls: ['./parcel-pickup.component.scss']
})
export class ParcelPickupComponent  implements OnInit {
  displayedColumns: string[] = [
    'id', 'client', 'recipient', 'name', 'entryDate', 
    'expectedArrivalDate', 'status', 'actions'
  ];
  dataSource = new MatTableDataSource<ParcelPickup>([]);
  totalParcels = 0;
  isLoading = false;
  searchValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parcelPickupService: ParcelPickupService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadParcels();
  }

  loadParcels() {
    this.isLoading = true;
    this.parcelPickupService.getPickupParcels({
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
        this.toastr.error(this.translate.instant('ERRORS.LOAD_PARCELS_PICKUP'));
        this.isLoading = false;
      }
    });
  }

  retrieveParcel(id: number) {
    this.isLoading = true;
    this.parcelPickupService.retrieveParcel(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.PARCEL_RETRIEVED'));
        this.loadParcels();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.RETRIEVE_PARCEL'));
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.paginator.firstPage();
    this.loadParcels();
  }
}
