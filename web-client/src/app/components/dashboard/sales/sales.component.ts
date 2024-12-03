import { Component, OnInit } from '@angular/core';
import { AccountCode } from 'src/app/shared/enums/enums';
import { Dashboard } from 'src/app/shared/models/dashboard.model';
import { DashboardService } from 'src/app/shared/rest-services/dashboard.service';
import { SessionService } from 'src/app/shared/services/session-service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit{
  isLoading = false;
  result!: Dashboard;
  showcards = false;
  constructor(
    private dashboardService: DashboardService,
    private sessionService: SessionService,
  ) {
    this.showcards = this.sessionService.hasAccounType(AccountCode.CLIENT);
  }
  ngOnInit() {
    this.loadClients();
  }


  loadClients() {
    this.isLoading = true;
    this.dashboardService.index().subscribe({
      next: (response: Dashboard) => {
        this.result = response;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
