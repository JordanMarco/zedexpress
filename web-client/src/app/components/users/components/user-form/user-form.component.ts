import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/models/user.model';
import { IAccountType } from 'src/app/shared/models/User';
import { AccountTypeService } from 'src/app/shared/rest-services/account-type.service';
import { UserService } from 'src/app/shared/rest-services/user.service';
import { AGENCES } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isLoading = false;
  accountTypes: IAccountType[] = [];
  countries = AGENCES; // Add more countries as needed

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private accountTypeService: AccountTypeService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    this.loadAccountType();
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.data ? [] : [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', this.data ? [] : [Validators.required]],
      cni: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      account_id: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('password_confirmation')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isLoading = true;
      const userData = this.userForm.value;

      const observable = this.data
        ? this.userService.update(this.data.id!, userData)
        : this.userService.store(userData);

      observable.subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant(this.data ? 'SUCCESS.USER_UPDATED' : 'SUCCESS.USER_CREATED')
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastr.error(
            this.translate.instant(this.data ? 'ERRORS.UPDATE_USER' : 'ERRORS.CREATE_USER')
          );
          this.isLoading = false;
        }
      });
    }
  }

  loadAccountType(){
    this.isLoading = true;
    this.accountTypeService.index(1, false).subscribe({
      next: (res) => {
        this.accountTypes = res;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
