import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { assetIdValidator } from '../api/id-validation';
import { NetworkService } from '../api/network.service';

@Component({
  selector: 'app-search-asset',
  templateUrl: './search-asset.component.html',
  styleUrls: ['./search-asset.component.css'],
})
export class SearchAssetComponent {
  bottleAssetForm = this.fb.group({
    assetId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: { value: null, disabled: true },
    manufacturer: { value: null, disabled: true },
    ownerName: { value: null, disabled: true },
    previousOwnerType: { value: null, disabled: true },
    currentOwnerType: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    lastUpdated: { value: null, disabled: true },
    cowId: { value: null, disabled: true },
  });

  cowAssetForm = this.fb.group({
    cowId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: { value: null, disabled: true },
    race: { value: null, disabled: true },
    age: { value: null, disabled: true },
    food: { value: null, disabled: true },
    bruteEnergy: { value: null, disabled: true },
    conversionFactor: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    farmId: { value: null, disabled: true },
  });

  farmAssetForm = this.fb.group({
    farmId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: { value: null, disabled: true },
    name: { value: null, disabled: true },
    owner: { value: null, disabled: true },
    country: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
  });

  assetTypes: any[] = [
    { value: 'BOTTLE' },
    { value: 'COW' },
    { value: 'FARM' },
  ];

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private networkService: NetworkService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.networkService
      .queryBottleAsset(
        this.assetTypes[0].value,
        this.bottleAssetForm.get('assetId').value
      )
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The transaction finished successfully!`,
          });
          this.isLoading = false;
          this.bottleAssetForm.setValue(data);
          this.bottleAssetForm.controls.assetId.setValue(String(data.assetId).substr(1,data.assetId.length));
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  onSubmitCow() {
    this.networkService
      .queryCowAsset(
        this.assetTypes[1].value,
        this.cowAssetForm.get('cowId').value
      )
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The transaction finished successfully!`,
          });
          this.isLoading = false;
          this.cowAssetForm.setValue(data);
          this.cowAssetForm.controls.cowId.setValue(String(data.cowId).substr(1,data.cowId.length));
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  onSubmitFarm() {
    this.networkService
      .queryFarmAsset(
        this.assetTypes[2].value,
        this.farmAssetForm.get('farmId').value
      )
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The transaction finished successfully!`,
          });
          this.isLoading = false;
          this.farmAssetForm.setValue(data);
          this.farmAssetForm.controls.farmId.setValue(String(data.farmId).substr(1,data.farmId.length))
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
