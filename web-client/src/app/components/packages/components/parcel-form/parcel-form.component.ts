import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ColisService } from 'src/app/shared/rest-services/colis.service';
import { IColis } from 'src/app/shared/models/colis';
import { AGENCES } from 'src/app/shared/enums/enums';
import { TarifService } from 'src/app/shared/rest-services/tarif.service';
import { ITarif } from 'src/app/shared/models/tarif';
import { ClientService } from 'src/app/shared/rest-services/client.service';
import { IClient } from 'src/app/shared/models/client';


@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.scss']
})
export class ParcelFormComponent implements OnInit {
  parcelForm: FormGroup;
  isLoading = false;
  readonly = false;
  agencies = AGENCES;
  fragilityOptions = ['Fragile', 'Normal'];
  categories!: ITarif[];
  clients!: IClient[];

  constructor(
    private fb: FormBuilder,
    private colisService: ColisService,
    private tarifService: TarifService,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ParcelFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { readonly: boolean } & IColis
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
    this.loadTarif();
    this.loadClient();
    this.setupPriceCalculation();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nom: ['', [Validators.required]],
      country: ['', [Validators.required]],
      fragilite: ['', [Validators.required]],
      contenance: ['', [Validators.required]],
      poids: [1, [Validators.required]],
      hauteur: [1, [Validators.required]],
      largeur: [1, [Validators.required]],
      longueur: [1, [Validators.required]],
      quantite: [1, [Validators.required]],
      receiver_id: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      tarif_id: ['', [Validators.required]],
      valeur_euro: [((1 / 5000) * 30), [Validators.required]],
      date_entre: ['', [Validators.required]],
      date_depart: ['', [Validators.required]],
      date_arrive: ['', [Validators.required]],
    });
  }

  private setupPriceCalculation() {
    const dimensionControls = ['longueur', 'largeur', 'hauteur', 'quantite'];
    dimensionControls.forEach(control => {
      this.parcelForm.get(control)?.valueChanges.subscribe(() => {
        this.calculatePrice();
      });
    });
  }

  private calculatePrice() {
    const longueur = this.parcelForm.get('longueur')?.value || 1;
    const hauteur = this.parcelForm.get('hauteur')?.value || 1;
    const largeur = this.parcelForm.get('largeur')?.value || 1;
    const quantite = this.parcelForm.get('quantite')?.value || 1;

    const valeur_euro = (((longueur * hauteur * largeur) / 5000) * 30) * quantite;

    this.parcelForm.patchValue({ valeur_euro }, { emitEvent: false });
  }

  onSubmit() {
    if (this.parcelForm.valid) {
      this.isLoading = true;
      const parcelData = this.parcelForm.getRawValue();

      const observable = this.data
        ? this.colisService.update(this.data.id!, parcelData)
        : this.colisService.store(parcelData);

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

  loadTarif(){
    this.tarifService.index(1, 10, '', false).subscribe({
      next: (res) => {
        this.categories = res;
      }
    })
  }

  loadClient(){
    this.clientService.index(1, 10, '', false).subscribe({
      next: (res) => {
        this.clients = res;
      }
    })
  }

}
