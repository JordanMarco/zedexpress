import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { IIncident } from 'src/app/shared/models/incident';
import { Incident } from 'src/app/shared/models/incident.model';
import { Message } from 'src/app/shared/models/message.model';
import { IncidentService } from 'src/app/shared/rest-services/incident.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  displayedColumns: string[] = ['id', 'client', 'packageName', 'subject', 'status', 'actions'];
  dataSource = new MatTableDataSource<IIncident>();
  totalMessages = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private incidentService: IncidentService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.$inputSubject
      .pipe(debounceTime(1000)) // Adjust the debounce time to your needs (e.g., 300ms)
      .subscribe(searchValue => {
        this.applyFilter()
      });
    this.loadMessages();
  }

  loadMessages() {
    this.isLoading = true;
    this.incidentService.index(
      (this.paginator?.pageIndex ?? 0) + 1,
      this.paginator?.pageSize || 10,
      this.searchValue,
      0
    ).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalMessages = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_INCIDENTS'));
        this.isLoading = false;
      }
    });
  }

  confirmDelete(message: Message) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { name: `${message.subject}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessage(message.id);
      }
    });
  }

  private deleteMessage(id: number) {
    this.isLoading = true;
    this.incidentService.destroy(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.MESSAGE_DELETED'));
        this.loadMessages();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.DELETE_MESSAGE'));
        this.isLoading = false;
      }
    });
  }

  updateStatus(message: Incident) {
    message.status = message.status === 'PENDING' ? 'RESOLVED' : 'PENDING';
    this.incidentService.update(message.id!, message).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.STATUS_UPDATED'));
        this.loadMessages();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.UPDATE_STATUS'));
      }
    });
  }

  search(event: Event): void {
    this.searchValue = event.target ? (event.target as HTMLInputElement).value : '';
    this.$inputSubject.next(this.searchValue);
  }

  applyFilter() {
    this.paginator.firstPage();
    this.loadMessages();
  }
}
