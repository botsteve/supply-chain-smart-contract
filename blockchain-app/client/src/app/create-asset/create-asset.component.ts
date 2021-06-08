import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';
import { Asset } from '../models/asset';
import { AssetTypes } from '../api/asset-types';
import { Farm } from '../models/farm';
import { Animal } from '../models/cow';
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
    animalId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]]
  });

  animalAssetForm = this.fb.group({
    animalId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: [null, Validators.required],
    race: [null, Validators.required],
    age: [null, Validators.required],
    food: [null, Validators.required],
    farmId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    animalCategory: [null, Validators.required],
    grossEnergyConsumption: [null, Validators.required],
    foodDigestibility: [null, Validators.required],
    urinaryEnergy: [null, Validators.required],
    treatedStableTrashFactor: [null, Validators.required],
    weight: [null, Validators.required],
    annualNitrogenOxidesExcretionFactor: [null, Validators.required],
    trashManagementSystem: [null, Validators.required],
    gasFactorMS: [null, Validators.required]
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
    { value: 'ANIMAL' },
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

  onSubmitAnimal() {
    if (this.animalAssetForm.valid) {
      this.isLoading = true;
      let newAsset: Animal = Object.assign(
        new Animal(),
        this.animalAssetForm.getRawValue()
      );
      this.networkService.createAnimalAsset(newAsset).subscribe(
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
