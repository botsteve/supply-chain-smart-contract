import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../api/network.service';
import { Asset } from '../models/asset';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  assets: Asset[];
  loading: boolean = false;

  constructor(private api: NetworkService) { }

  ngOnInit() {
    this.api.queryAllAssets().subscribe(data => {
      this.assets = data.tradeAssets;
      this.loading = true;
    });
  }

}
