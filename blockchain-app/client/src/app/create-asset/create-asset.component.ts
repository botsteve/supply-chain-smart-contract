import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';
import { Asset } from '../models/asset';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {

  tradeId: string = '';
  value: string = '';
  loading: boolean;

  constructor(private networkService: NetworkService, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if(this.tradeId && this.value){
      this.loading = true;
      let asset: Asset = new Asset(this.tradeId, this.value)
      this.networkService.createAsset(asset).subscribe(() => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Transaction Success', detail: `The asset has been created successfully!` });
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The Asset ID/Value are empty!' });
    }
  }

}
