import { Component, ViewChild } from '@angular/core';
import { DeleteConfirmationComponent } from '../../shared/components/delete-confirmation/delete-confirmation.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'username', 'accountType', 'country', 'actions'];
  dataSource = new MatTableDataSource<User>([{
    id: 1,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'Switzerland',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  },
  {
    id: 2,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'suisse',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  },{
    id: 3,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'suisse',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  },{
    id: 4,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'suisse',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  }, {
    id: 5,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'suisse',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  },{
    id: 6,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'suisse',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  },{
    id: 7,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'Switzerland',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  },{
    id: 8,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'Switzerland',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  },{
    id: 9,
    lastName: 'Nankeng Meli',
    firstName: 'Baudouin',
    username: 'MegaMel',
    accountType: 'Administrator',
    country: 'Switzerland',
    nationalId: '4545484458',
    address: 'Dschang',
    phone: '690846155',
    email: 'melibaudouin@gmail.com'
  }]);
  totalUsers = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
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
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers({
      page: this.paginator?.pageIndex || 0,
      pageSize: this.paginator?.pageSize || 10,
      search: this.searchValue
    }).subscribe({
      next: (response) => {
        this.dataSource.data = response.users;
        this.totalUsers = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_USERS'));
        this.isLoading = false;
      }
    });
  }

  openUserForm(user?: User) {
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

  confirmDelete(user: User) {
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
}
