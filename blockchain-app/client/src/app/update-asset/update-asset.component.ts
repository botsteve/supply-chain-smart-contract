import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NetworkService } from '../api/network.service';
import { MessageService } from 'primeng/api';
import { Asset } from '../models/asset';

@Component({
  selector: 'app-update-asset',
  templateUrl: './update-asset.component.html',
  styleUrls: ['./update-asset.component.css']
})
export class UpdateAssetComponent {
  assetForm = this.fb.group({
    assetId: [null, Validators.required],
    ownerName: [null, Validators.required],
    updateType: [null, Validators.required]
  });

  updateTypes: any[] = [
    { value: 'DISTRIBUTE' },
    { value: 'RETAIL' },
    { value: 'CONSUMER' }
  ];

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private networkService: NetworkService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.assetForm.valid) {
      let newAsset: Asset = Object.assign(
        new Asset(),
        this.assetForm.getRawValue()
      );
      this.isLoading = true;
      switch (this.assetForm.get('updateType').value) {
        case 'DISTRIBUTE':
          this.networkService.wholesalerDistribute(newAsset).subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Transaction Success',
              detail: `The asset has been updated successfully to distribution!`
            });
            this.isLoading = false;
          },() => {
            this.isLoading = false;
          })
          break;
        case 'RETAIL':
          this.networkService.retailerReceived(newAsset).subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Transaction Success',
              detail: `The asset has been updated successfully to retail!`
            });
            this.isLoading = false;
          },() => {
            this.isLoading = false;
          });
          break;
        case 'CONSUMER':
          this.networkService.sellAsset(newAsset).subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Transaction Success',
              detail: `The asset has been updated successfully to consumer!`
            });
            this.isLoading = false;
          },() => {
            this.isLoading = false;
          });
          break;
      }
    }
  }
}
