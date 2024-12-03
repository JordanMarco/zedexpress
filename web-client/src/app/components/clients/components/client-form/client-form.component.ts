import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Client } from 'src/app/shared/models/client.model';
import { ClientService } from 'src/app/shared/rest-services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isLoading = false;
  phoneUtil = PhoneNumberUtil.getInstance();
  countries = ['Switzerland', 'Belgium', 'Cameroun'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {
    this.clientForm = this.createForm();
  }

  ngOnInit() {
    if (this.data) {
      this.clientForm.patchValue(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', this.data ? [] : [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', this.data ? [] : [Validators.required]],
      cni: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('password_confirmation')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.isLoading = true;
      const clientData = this.clientForm.value;

      const observable = this.data
        ? this.clientService.update(this.data.id!, clientData)
        : this.clientService.store(clientData);

      observable.subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant(this.data ? 'SUCCESS.CLIENT_UPDATED' : 'SUCCESS.CLIENT_CREATED')
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastr.error(
            this.translate.instant(this.data ? 'ERRORS.UPDATE_CLIENT' : 'ERRORS.CREATE_CLIENT')
          );
          this.isLoading = false;
        }
      });
    }
  }
}
