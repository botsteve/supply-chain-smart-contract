import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../api/network.service';
import { MessageService } from 'primeng/api';
import { Asset } from '../models/asset';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  tradeId: string = '';
  value: string = '';
  loading: boolean;

  constructor(private networkService: NetworkService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSearch() {
    this.loading = true;
    if (!this.tradeId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The Asset ID is not valid' });
      this.loading = false;
    } else {
      this.networkService.queryAsset(this.tradeId).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Transaction Success', detail: `The transaction finished successfully!` });
        this.loading = false;
        this.value = data.value;
      },
        (error) => {
          this.loading = false;
        });
    }
  }

  onSubmit() {
    let asset: Asset = new Asset(this.tradeId, this.value)
    console.log(!this.value && !this.tradeId);
    this.loading = true;
    if (this.value && this.tradeId) {
      this.networkService.updateAsset(asset).subscribe(() => {
        console.log("called");
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Transaction Success', detail: `The transaction finished successfully!` });
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Transaction Error', detail: `Empty Value!` });
    }

  }

  onRefresh() {
    this.tradeId = '';
    this.value = '';
  }
}
