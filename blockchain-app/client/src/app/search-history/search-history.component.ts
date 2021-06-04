import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  assetId: string = '';
  displayError: boolean;
  historyLength: number = 0;
  isLoading: boolean = false;

  assetFormManufacturer = this.fb.group({
    manufacturer: { value: null, disabled: true },
    assetType: { value: null, disabled: true },
    ownerName: { value: null, disabled: true },
    previousOwnerType: { value: null, disabled: true },
    currentOwnerType: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    lastUpdated: { value: null, disabled: true }
  });

  assetFormDistributor = this.fb.group({
    manufacturer: { value: null, disabled: true },
    assetType: { value: null, disabled: true },
    ownerName: { value: null, disabled: true },
    previousOwnerType: { value: null, disabled: true },
    currentOwnerType: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    lastUpdated: { value: null, disabled: true }
  });

  assetFormRetailer = this.fb.group({
    manufacturer: { value: null, disabled: true },
    assetType: { value: null, disabled: true },
    ownerName: { value: null, disabled: true },
    previousOwnerType: { value: null, disabled: true },
    currentOwnerType: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    lastUpdated: { value: null, disabled: true }
  });

  assetFormConsumer = this.fb.group({
    manufacturer: { value: null, disabled: true },
    assetType: { value: null, disabled: true },
    ownerName: { value: null, disabled: true },
    previousOwnerType: { value: null, disabled: true },
    currentOwnerType: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    lastUpdated: { value: null, disabled: true }
  });

  constructor(
    private fb: FormBuilder,
    private networkService: NetworkService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.assetId) {
      this.isLoading = true;
      this.networkService
        .queryAssetHistoryByKey(this.assetId)
        .subscribe(data => {
          this.historyLength = data.length;
          if (data.length > 0 && data.length == 1) {
            this.assetFormManufacturer.patchValue(data[0]);
          } else if (data.length > 1 && data.length == 2) {
            this.assetFormManufacturer.patchValue(data[1]);
            this.assetFormDistributor.patchValue(data[0]);
          } else if (data.length > 2 && data.length == 3) {
            this.assetFormManufacturer.patchValue(data[2]);
            this.assetFormDistributor.patchValue(data[1]);
            this.assetFormRetailer.patchValue(data[0]);
          } else if (data.length > 3 && data.length == 4) {
            this.assetFormManufacturer.patchValue(data[3]);
            this.assetFormDistributor.patchValue(data[2]);
            this.assetFormRetailer.patchValue(data[1]);
            this.assetFormConsumer.patchValue(data[0]);
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The transaction has finished successfully!`
          });
          this.displayError = false;
          this.isLoading = false;
        },() => {
          this.isLoading = false;
        });
    } else {
      this.displayError = true;
    }
  }
}
