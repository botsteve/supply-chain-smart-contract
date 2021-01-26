import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';

@Component({
  selector: 'app-delete-asset',
  templateUrl: './delete-asset.component.html',
  styleUrls: ['./delete-asset.component.css']
})
export class DeleteAssetComponent implements OnInit {

  tradeId: string = '';
  loading: boolean;

  constructor(private networkService: NetworkService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.tradeId) {
      this.loading = true
      this.networkService.deleteAsset(this.tradeId).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Transaction Success', detail: `The Asset was deleted successfully!` });
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The Asset ID is empty' });
    }

  }
}
