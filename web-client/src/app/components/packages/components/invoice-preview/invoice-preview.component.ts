import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IColis } from 'src/app/shared/models/colis';
import { Parcel } from 'src/app/shared/models/parcel.model';
import { ColisService } from 'src/app/shared/rest-services/colis.service';
import { ParcelService } from 'src/app/shared/rest-services/parcel.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent {
  parcel!: IColis;
  adress: string = '';
  constructor(
    private route: ActivatedRoute,
    private parcelService: ColisService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.parcelService.getParcel(id).subscribe(parcel => {
      this.parcel = parcel;
      if (this.parcel.country == 'Belgique') {
        this.adress = "Avenue Louise 231, Bruxelles";
      } else if (this.parcel.country == 'France') {
        this.adress = "45 Rue des Lilas, Lyon";
      } else {
        this.adress = "Rue 1234, Quartier Bastos, Yaoundé";
      }
    });
  }

  printInvoice() {
    window.print();
  }

  round(amount: number) {
    return amount === 0 ? 0 : Math.round(amount * 100) / 100;
  }

}
