import { Component, ViewChild } from '@angular/core';
import { DeleteConfirmationComponent } from '../../shared/components/delete-confirmation/delete-confirmation.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user.service';
import { UserService as RestUserService } from 'src/app/shared/rest-services/user.service';
import { debounceTime, Subject } from 'rxjs';
import { IUser } from 'src/app/shared/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'username', 'accountType', 'country', 'actions'];
  dataSource = new MatTableDataSource<IUser>();
  totalUsers = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private restUserService: RestUserService,
    private userService: UserService,
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
    this.fetch(1);
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.restUserService.index((this.paginator?.pageIndex ?? 0) + 1, this.paginator?.pageSize, this.searchValue).subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.totalUsers = res.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_USERS'));
        this.isLoading = false;
      }
    });
  }

  openUserForm(user?: IUser) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  confirmDelete(user: IUser) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && user.id) {
        this.deleteUser(user.id);
      }
    });
  }

  private deleteUser(id: number) {
    this.isLoading = true;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.USER_DELETED'));
        this.loadUsers();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.DELETE_USER'));
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
    this.loadUsers();
  }

  fetch(page: number, search: string = '') {
    this.restUserService.index().subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
}
