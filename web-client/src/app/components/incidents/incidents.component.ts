import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { debounceTime, Subject } from 'rxjs';
import { IncidentFormComponent } from './components/incident-form/incident-form.component';
import { Incident } from 'src/app/shared/models/incident.model';
import { incidentService } from 'src/app/shared/rest-services/incident.service';
import { IIncident } from 'src/app/shared/models/incident';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'clientName', 'parcelName', 'title', 'reason', 'status', 'actions'];
  dataSource = new MatTableDataSource<Incident>();
  totalIncidents = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private incidentService: incidentService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.$inputSubject
    .pipe(debounceTime(1000)) // Adjust the debounce time to your needs (e.g., 300ms)
    .subscribe(searchValue => {
      this.applyFilter()
    });
    this.loadIncidents();
  }

  loadIncidents() {
    this.isLoading = true;
    this.incidentService.index(
      (this.paginator?.pageIndex ?? 0) + 1,
      this.paginator?.pageSize || 10,
      this.searchValue
    ).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalIncidents = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_INCIDENTS'));
        this.isLoading = false;
      }
    });
  }

  openIncidentForm(incident?: Incident) {
    const dialogRef = this.dialog.open(IncidentFormComponent, {
      width: '600px',
      data: incident
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIncidents();
      }
    });
  }

  confirmDelete(incident: Incident) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { name: incident.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && incident.id) {
        this.deleteIncident(incident.id);
      }
    });
  }

  private deleteIncident(id: number) {
    this.isLoading = true;
    this.incidentService.destroy(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.INCIDENT_DELETED'));
        this.loadIncidents();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.DELETE_INCIDENT'));
        this.isLoading = false;
      }
    });
  }

  previewPDF(incident: IIncident) {
    const pdfDataUri = this.incidentService.generatePDF(incident.id);
    window.open(pdfDataUri);
  }

  downloadPDF(incident: IIncident) {
    const pdfDataUri = this.incidentService.generatePDF(incident.id);
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = `incident-${incident.id}.pdf`;
    link.click();
  }


  search(event: Event): void {
    this.searchValue = event.target ? (event.target as HTMLInputElement).value : '';
    this.$inputSubject.next(this.searchValue);
  }

  applyFilter() {
    this.paginator.firstPage();
    this.loadIncidents();
  }
}
