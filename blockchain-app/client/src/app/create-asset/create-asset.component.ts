import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';
import { Asset } from '../models/asset';
import { AssetTypes } from '../api/asset-types';
import { Farm } from '../models/farm';
import { Cow } from '../models/cow';
import { assetIdValidator } from '../api/id-validation';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {

  currentAssetType: string = AssetTypes.BOTTLE;
  assetForm = this.fb.group({
    assetId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    manufacturer: [null, Validators.required],
    assetType: [null, Validators.required],
    ownerName: [null, Validators.required],
    cowId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]]
  });

  cowAssetForm = this.fb.group({
    cowId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: [null, Validators.required],
    race: [null, Validators.required],
    age: [null, Validators.required],
    food: [null, Validators.required],
    bruteEnergy: [null, Validators.required],
    conversionFactor: [null, Validators.required],
    farmId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
  });

  farmAssetForm = this.fb.group({
    farmId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: [null, Validators.required],
    name: [null, Validators.required],
    owner: [null, Validators.required],
    country: [null, Validators.required],
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
  ) { }

  ngOnInit(): void { }

  onChange(event: any) {
    this.currentAssetType = event.value;
  }

  onSubmitBottle() {
    if (this.assetForm.valid) {
      this.isLoading = true;
      let newAsset: Asset = Object.assign(
        new Asset(),
        this.assetForm.getRawValue()
      );
      this.networkService.createBottleAsset(newAsset).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The asset has been created successfully!`
          });
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    }
  }

  onSubmitCow() {
    if (this.assetForm.valid) {
      this.isLoading = true;
      let newAsset: Cow = Object.assign(
        new Cow(),
        this.assetForm.getRawValue()
      );
      this.networkService.createCowAsset(newAsset).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The asset has been created successfully!`
          });
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    }
  }

  onSubmitFarm() {
    if (this.farmAssetForm.valid) {
      this.isLoading = true;
      let newAsset: Farm = Object.assign(
        new Farm(),
        this.farmAssetForm.getRawValue()
      );
      this.networkService.createFarmAsset(newAsset).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The asset has been created successfully!`
          });
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    }
  }
}
