import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';
import { Asset } from '../models/asset';

@Component({
  selector: 'app-search-single',
  templateUrl: './search-single.component.html',
  styleUrls: ['./search-single.component.css']
})
export class SearchSingleComponent implements OnInit {

  tradeId: string = '';
  loading: boolean;
  cols: any[] = [];
  assets: Asset[] = [];

  constructor(private networkService: NetworkService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'tradeId', header: 'Asset ID' },
      { field: 'value', header: 'Value' },
    ];

  }

  onSubmit() {

    this.loading = true;
    if (!this.tradeId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The Asset ID is empty' });
      this.loading = false;
    } else {
      this.networkService.queryAsset(this.tradeId).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Transaction Success', detail: `The transaction finished successfully!` });
        this.loading = false;
        let asset: Asset = new Asset(data.tradeId, data.value);
        this.assets.push(asset);
      },
        (error) => {
          this.loading = false;
        });
    }
  }

}
