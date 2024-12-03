import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { IColis } from 'src/app/shared/models/colis';
import { IncidentService } from 'src/app/shared/rest-services/incident.service';
import { IIncident } from 'src/app/shared/models/incident';
import { ColisService } from 'src/app/shared/rest-services/colis.service';


@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss']
})
export class IncidentFormComponent implements OnInit{
  incidentForm: FormGroup;
  isLoading = false;
  colis: IColis[] = [];

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private colisServices: ColisService,
    private dialogRef: MatDialogRef<IncidentFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: IIncident
  ) {
    this.incidentForm = this.createForm();
    if (this.data) {
      this.incidentForm.patchValue(this.data);
    }
  }
  ngOnInit(): void {
    this.loadColis();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      titre: ['', [Validators.required]],
      colis_id: ['', [Validators.required]],
      motif: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      this.isLoading = true;
      const incidentData = this.incidentForm.value;

      const observable = this.data
        ? this.incidentService.update(this.data.id!, incidentData)
        : this.incidentService.store(incidentData);

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

  loadColis() {
    this.isLoading = true;
    this.colisServices.allColis().subscribe({
      next: (res) => {
        this.colis = res;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
