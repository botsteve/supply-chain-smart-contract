import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: "/home"
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        items: [
          { label: 'All Assets', routerLink: "/search-all" },
          { label: 'Specific Asset', routerLink: "/search-single" }
        ]
      },
      {
        label: 'Asset Transactions',
        icon: 'pi pi-pencil',
        items: [
          { label: 'Create', routerLink: "/create" },
          { label: 'Update', routerLink: "/update" },
          { label: 'Delete', routerLink: "/delete", icon: 'pi pi-trash'}
        ]
      }
    ];
  }
}