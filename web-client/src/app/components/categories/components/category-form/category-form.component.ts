import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category.model';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.categoryForm = this.createForm();
    if (this.data) {
      this.categoryForm.patchValue(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      label: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isLoading = true;
      const categoryData = this.categoryForm.value;

      const observable = this.data
        ? this.categoryService.updateCategory(this.data.id!, categoryData)
        : this.categoryService.createCategory(categoryData);

      observable.subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant(this.data ? 'SUCCESS.CATEGORY_UPDATED' : 'SUCCESS.CATEGORY_CREATED')
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastr.error(
            this.translate.instant(this.data ? 'ERRORS.UPDATE_CATEGORY' : 'ERRORS.CREATE_CATEGORY')
          );
          this.isLoading = false;
        }
      });
    }
  }
}