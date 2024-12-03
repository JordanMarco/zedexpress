import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ParcelService } from 'src/app/shared/rest-services/parcel.service';
import { Parcel } from 'src/app/shared/models/parcel.model';


@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.scss']
})
export class ParcelFormComponent implements OnInit {
  parcelForm: FormGroup;
  isLoading = false;
  readonly = false;
  agencies = ['Agence Suisse', 'Agence Belgique', 'Agence Cameroun'];
  fragilityOptions = ['Fragile', 'Normal'];
  categories = ['Véhicules', 'Documents', 'Colis'];

  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelService,
    private dialogRef: MatDialogRef<ParcelFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { readonly: boolean } & Parcel
  ) {
    this.readonly = data?.readonly || false;
    this.parcelForm = this.createForm();
  }

  ngOnInit() {
    if (this.data) {
      this.parcelForm.patchValue(this.data);
    }
    
    if (this.readonly) {
      this.parcelForm.disable();
    }

    this.setupPriceCalculation();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      client: ['', [Validators.required]],
      recipient: ['', [Validators.required]],
      name: ['', [Validators.required]],
      weight: [0, [Validators.required, Validators.min(0)]],
      width: [0, [Validators.required, Validators.min(0)]],
      height: [0, [Validators.required, Validators.min(0)]],
      length: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      description: [''],
      fragility: ['Normal', [Validators.required]],
      category: ['', [Validators.required]],
      price: [{value: 0, disabled: true}],
      agency: ['', [Validators.required]],
      entryDate: [new Date(), [Validators.required]],
      departureDate: ['', [Validators.required]],
      expectedArrivalDate: ['', [Validators.required]]
    });
  }

  private setupPriceCalculation() {
    const dimensionControls = ['weight', 'width', 'height', 'length'];
    dimensionControls.forEach(control => {
      this.parcelForm.get(control)?.valueChanges.subscribe(() => {
        this.calculatePrice();
      });
    });
  }

  private calculatePrice() {
    const weight = this.parcelForm.get('weight')?.value || 0;
    const width = this.parcelForm.get('width')?.value || 0;
    const height = this.parcelForm.get('height')?.value || 0;
    const length = this.parcelForm.get('length')?.value || 0;

    const price = this.parcelService.calculatePrice(weight, width, height, length);
    this.parcelForm.patchValue({ price }, { emitEvent: false });
  }

  onSubmit() {
    if (this.parcelForm.valid) {
      this.isLoading = true;
      const parcelData = this.parcelForm.getRawValue();

      const observable = this.data
        ? this.parcelService.updateParcel(this.data.id!, parcelData)
        : this.parcelService.createParcel(parcelData);

      observable.subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant(this.data ? 'SUCCESS.PARCEL_UPDATED' : 'SUCCESS.PARCEL_CREATED')
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastr.error(
            this.translate.instant(this.data ? 'ERRORS.UPDATE_PARCEL' : 'ERRORS.CREATE_PARCEL')
          );
          this.isLoading = false;
        }
      });
    }
  }
}