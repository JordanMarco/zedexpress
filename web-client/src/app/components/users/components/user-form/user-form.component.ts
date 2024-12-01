import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/models/user.model'; 
import { UserService } from 'src/app/shared/services/user.service'; 

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isLoading = false;
  accountTypes = ['Administrator', 'Agent', 'Client'];
  countries = ['Switzerland', 'Belgium']; // Add more countries as needed

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.data ? [] : [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', this.data ? [] : [Validators.required]],
      nationalId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      accountType: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isLoading = true;
      const userData = this.userForm.value;

      const observable = this.data
        ? this.userService.updateUser(this.data.id!, userData)
        : this.userService.createUser(userData);

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
}