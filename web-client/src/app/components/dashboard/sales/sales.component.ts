import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/shared/models/dashboard.model';
import { DashboardService } from 'src/app/shared/rest-services/dashboard.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit{
  isLoading = false;
  result!: Dashboard;
  constructor(
    private dashboardService: DashboardService,
  ) {
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
