import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  displayedColumns: string[] = ['id', 'client', 'packageName', 'subject', 'content', 'status', 'actions'];
  dataSource = new MatTableDataSource<Message>([]);
  totalMessages = 0;
  isLoading = false;
  searchValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private messageService: MessageService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.isLoading = true;
    this.messageService.getMessages({
      page: this.paginator?.pageIndex || 0,
      pageSize: this.paginator?.pageSize || 10,
      search: this.searchValue
    }).subscribe({
      next: (response) => {
        this.dataSource.data = response.messages;
        this.totalMessages = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_MESSAGES'));
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
    this.messageService.deleteMessage(id).subscribe({
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

  updateStatus(message: Message) {
    const newStatus = message.status === 'PENDING' ? 'RESOLVED' : 'PENDING';
    this.messageService.updateMessageStatus(message.id, newStatus).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.STATUS_UPDATED'));
        this.loadMessages();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.UPDATE_STATUS'));
      }
    });
  }

  applyFilter(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.paginator.firstPage();
    this.loadMessages();
  }
}
