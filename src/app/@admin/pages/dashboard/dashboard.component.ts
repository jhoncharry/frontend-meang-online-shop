import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { LABEL } from '../../core/services/constants/title.constants';
import { TitleService } from '../../core/services/title.service';
import { closeAlert, loadingData } from '../../shared/alerts/alerts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items: Array<any> = [
    {
      icon: 'fas fa-users',
      title: 'Users',
      value: 'users',
    },
    {
      icon: 'fas fa-store',
      title: 'Products for sale',
      value: 'storeProduct',
    },
    {
      icon: 'fas fa-tags',
      title: 'Tags',
      value: 'tags',
    },
    {
      icon: 'fas fa-atlas',
      title: 'Genres',
      value: 'genres',
    },
    {
      icon: 'fas fa-gamepad',
      title: 'Games',
      value: 'games',
    },

    {
      icon: 'fas fa-desktop',
      title: 'Platforms',
      value: 'platforms',
    },
  ];

  loading: boolean = true;

  constructor(
    private titleService: TitleService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    loadingData('Loading data', 'Statistics are loading...');
    this.titleService.updateTitle(LABEL.DASHBOARD);
    this.loading = true;

    this.adminService.getStats().subscribe((data: any) => {
      this.loading = false;

      this.items.map((item: any) => (item.value = data[item.value]));

      closeAlert();
    });
  }
}
