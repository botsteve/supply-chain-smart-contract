import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { QueryAllDataSource } from './query-all-datasource';
import { Asset } from '../models/asset';
import { NetworkService } from '../api/network.service';

@Component({
  selector: 'app-query-all',
  templateUrl: './query-all.component.html',
  styleUrls: ['./query-all.component.css']
})
export class QueryAllComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Asset>;
  dataSource: QueryAllDataSource;

  isLoading: boolean = true;

  constructor(private api: NetworkService) {
    this.api.queryAllAssets().subscribe(data => {
      this.dataSource = new QueryAllDataSource(data.tradeAssets);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.isLoading = false;
    },() => {
      this.isLoading = false;
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'assetId',
    'assetType',
    'manufacturer',
    'ownerName',
    'previousOwnerType',
    'currentOwnerType',
    'createDateTime',
    'lastUpdated'
  ];

  ngOnInit() {}

  ngAfterViewInit() {
  }
}
