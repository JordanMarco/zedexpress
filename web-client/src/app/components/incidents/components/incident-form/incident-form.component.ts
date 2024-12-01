import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { IncidentService } from 'src/app/shared/services/incident.service';
import { Incident } from 'src/app/shared/models/incident.model';


@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss']
})
export class IncidentFormComponent {
  incidentForm: FormGroup;
  isLoading = false;
  parcels = [{id:1, name: 'parcel 1'}, {id:2, name: 'parcel 2'}]

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private dialogRef: MatDialogRef<IncidentFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Incident
  ) {
    this.incidentForm = this.createForm();
    if (this.data) {
      this.incidentForm.patchValue(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      parcelId: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      status: ['PENDING']
    });
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      this.isLoading = true;
      const incidentData = this.incidentForm.value;

      const observable = this.data
        ? this.incidentService.updateIncident(this.data.id!, incidentData)
        : this.incidentService.createIncident(incidentData);

      observable.subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant(this.data ? 'SUCCESS.INCIDENT_UPDATED' : 'SUCCESS.INCIDENT_CREATED')
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastr.error(
            this.translate.instant(this.data ? 'ERRORS.UPDATE_INCIDENT' : 'ERRORS.CREATE_INCIDENT')
          );
          this.isLoading = false;
        }
      });
    }
  }
}