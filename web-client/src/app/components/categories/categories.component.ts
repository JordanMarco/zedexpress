import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryFormComponent } from './components/category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'label', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Category>([
    {
      id: 1,
      label: 'label',
      amount: 150
    }
  ]);
  totalCategories = 0;
  isLoading = false;
  searchValue = '';
  $inputSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
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
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoryService.getCategories({
      page: this.paginator?.pageIndex || 0,
      pageSize: this.paginator?.pageSize || 10,
      search: this.searchValue
    }).subscribe({
      next: (response) => {
        this.dataSource.data = response.categories;
        this.totalCategories = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.LOAD_CATEGORIES'));
        this.isLoading = false;
      }
    });
  }

  openCategoryForm(category?: Category) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  confirmDelete(category: Category) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { name: category.label }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && category.id) {
        this.deleteCategory(category.id);
      }
    });
  }

  private deleteCategory(id: number) {
    this.isLoading = true;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.toastr.success(this.translate.instant('SUCCESS.CATEGORY_DELETED'));
        this.loadCategories();
      },
      error: () => {
        this.toastr.error(this.translate.instant('ERRORS.DELETE_CATEGORY'));
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
    this.loadCategories();
  }
}
