import { Component, ViewChild } from '@angular/core';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject } from 'rxjs';
import { ClientService } from 'src/app/shared/rest-services/client.service';
import { UserService } from 'src/app/shared/rest-services/user.service';
import { IUser } from 'src/app/shared/models/User';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'username', 'country', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<IUser>();
  totalClients = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientService: ClientService,
    private userService: UserService,
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
    this.loadClients();
  }

  loadClients() {
    this.isLoading = true;
    this.clientService.index(
      (this.paginator?.pageIndex ?? 0) + 1,
      this.paginator?.pageSize || 10,
      this.searchValue
    ).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalClients = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_CLIENTS'));
        this.isLoading = false;
      }
    });
  }

  openClientForm(client?: IUser) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '600px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

  confirmDelete(client: IUser) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { name: `${client.first_name} ${client.last_name}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && client.id) {
        this.deleteClient(client.id);
      }
    });
  }

  private deleteClient(id: number) {
    this.isLoading = true;
    this.userService.destroy(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.CLIENT_DELETED'));
        this.loadClients();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.DELETE_CLIENT'));
        this.isLoading = false;
      }
    });
  }

  search(event: Event): void {
    this.searchValue = event.target ? (event.target as HTMLInputElement).value : '';
    this.$inputSubject.next(this.searchValue);
  }

  applyFilter() {
    this.paginator.firstPage();
    this.loadClients();
  }
}
