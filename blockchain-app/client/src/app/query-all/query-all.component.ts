import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { QueryAllDataSource } from './query-all-datasource';
import { Asset } from '../models/asset';
import { NetworkService } from '../api/network.service';
import { QueryAllCowsDataSource } from './query-all-cows-datasource';
import { QueryAllFarmsDataSource } from './query-all-farms-datasource';
import { Cow } from '../models/cow';
import { Farm } from '../models/farm';

@Component({
  selector: 'app-query-all',
  templateUrl: './query-all.component.html',
  styleUrls: ['./query-all.component.css'],
})
export class QueryAllComponent implements AfterViewInit, OnInit {
  @ViewChild('paginator1') paginator: MatPaginator;
  @ViewChild('sort1') sort: MatSort;
  @ViewChild('bottleTable') table: MatTable<Asset>;
  dataSource: QueryAllDataSource;

  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('cowsTable') table2: MatTable<Cow>;
  dataSource2: QueryAllCowsDataSource;

  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('sort3') sort3: MatSort;
  @ViewChild('farmTable') table3: MatTable<Farm>;
  dataSource3: QueryAllFarmsDataSource;

  isLoading: boolean = true;

  constructor(private api: NetworkService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'assetId',
    'assetType',
    'manufacturer',
    'ownerName',
    'previousOwnerType',
    'currentOwnerType',
    'createDateTime',
    'lastUpdated',
    'cowId',
  ];

  displayedCowColumns = [
    'cowId',
    'assetType',
    'race',
    'age',
    'food',
    'bruteEnergy',
    'conversionFactor',
    'farmId',
    'createDateTime',
  ];

  displayedFarmColumns = [
    'farmId',
    'assetType',
    'name',
    'owner',
    'country',
    'createDateTime',
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.api.queryAllBottleAssets('BOTTLE').subscribe(
      (data) => {
        this.dataSource = new QueryAllDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onChange(event: any) {
    console.log(event);

    switch (event.index) {
      case 0:
        this.api.queryAllBottleAssets('BOTTLE').subscribe(
          (data) => {
            this.dataSource = new QueryAllDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.table.dataSource = this.dataSource;
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
        break;

      case 1:
        this.api.queryAllCowAssets('COW').subscribe(
          (data) => {
            this.dataSource2 = new QueryAllCowsDataSource(data);
            this.dataSource2.sort = this.sort2;
            this.dataSource2.paginator = this.paginator2;
            this.table2.dataSource = this.dataSource2;
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
        break;

      case 2:
        this.api.queryAllFarmAssets('FARM').subscribe(
          (data) => {
            this.dataSource3 = new QueryAllFarmsDataSource(data);
            this.dataSource3.sort = this.sort3;
            this.dataSource3.paginator = this.paginator3;
            this.table3.dataSource = this.dataSource3;
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
        break;
    }
  }
}
