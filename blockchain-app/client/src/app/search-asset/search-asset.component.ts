import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';

@Component({
  selector: 'app-search-asset',
  templateUrl: './search-asset.component.html',
  styleUrls: ['./search-asset.component.css']
})
export class SearchAssetComponent {
  assetForm = this.fb.group({
    assetId: [null, Validators.required],
    manufacturer: { value: null, disabled: true },
    assetType: { value: null, disabled: true },
    ownerName: { value: null, disabled: true },
    previousOwnerType: { value: null, disabled: true },
    currentOwnerType: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    lastUpdated: { value: null, disabled: true }
  });

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private networkService: NetworkService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.networkService
      .queryAsset(this.assetForm.get('assetId').value)
      .subscribe(
        data => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The transaction finished successfully!`
          });
          this.isLoading = false;
          this.assetForm.patchValue(data);
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
