import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AGENCES } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-calculate-price',
  templateUrl: './calculate-price.component.html',
  styleUrls: ['./calculate-price.component.scss'],
})
export class CalculatePriceComponent {
  parcelForm: FormGroup;
  isLoading = false;
  readonly = false;
  showPrice = false;
  agencies = AGENCES;
  fragilityOptions = ['Fragile', 'Normal'];
  valeur_euro = 0;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
  ) {
    this.parcelForm = this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): FormGroup {
    return this.fb.group({
      country_start: ['', [Validators.required]],
      country_end: ['', [Validators.required]],
      poids: [0, [Validators.required]],
      hauteur: [0, [Validators.required]],
      largeur: [0, [Validators.required]],
      longueur: [0, [Validators.required]],
      quantite: [0, [Validators.required]],
    });
  }



  calculatePrice() {
    const longueur = this.parcelForm.get('longueur')?.value || 1;
    const hauteur = this.parcelForm.get('hauteur')?.value || 1;
    const largeur = this.parcelForm.get('largeur')?.value || 1;
    const quantite = this.parcelForm.get('quantite')?.value || 1;

    this.valeur_euro = ((longueur * hauteur * largeur) / 5000) * 30 * quantite;
    const price = this.valeur_euro
    
    this.parcelForm.patchValue({ price }, { emitEvent: false });
    this.showPrice = true;
  }

  resetForm(){
    this.showPrice = false
    this.parcelForm.reset({
      country_start: '',
      country_end: '',
      poids: 0,
      hauteur: 0,
      largeur: 0,
      longueur: 0,
      quantite: 0,
      valeur_euro: (1 / 5000) * 30,
    });
  }
}
