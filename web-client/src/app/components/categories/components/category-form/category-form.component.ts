import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TarifService } from 'src/app/shared/rest-services/tarif.service';
import { ITarif } from 'src/app/shared/models/tarif';


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
    private categoryService: TarifService,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: ITarif
  ) {
    this.categoryForm = this.createForm();
    if (this.data) {
      this.categoryForm.patchValue(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      libelle: ['', [Validators.required]],
      montant: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isLoading = true;
      const categoryData = this.categoryForm.value;

      const observable = this.data
        ? this.categoryService.update(this.data.id!, categoryData)
        : this.categoryService.store(categoryData);

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
