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

  constructor(
    private route: ActivatedRoute,
    private parcelService: ColisService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.parcelService.getParcel(id).subscribe(parcel => {
      this.parcel = parcel;
    });
  }

  printInvoice() {
    window.print();
  }
}
