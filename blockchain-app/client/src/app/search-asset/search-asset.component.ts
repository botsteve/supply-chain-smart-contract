import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
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
    animalId: { value: null, disabled: true },
  });

  animalAssetForm = this.fb.group({
    animalId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: { value: null, disabled: true },
    age: { value: null, disabled: true },
    food: { value: null, disabled: true },
    farmId: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    animalCategory: { value: null, disabled: true },
    animalSubCategory: { value: null, disabled: true },
    grossEnergyConsumption: { value: null, disabled: true },
    foodDigestibility: { value: null, disabled: true },
    urinaryEnergy: { value: null, disabled: true },
    treatedStableTrashFactor: { value: null, disabled: true },
    weight: { value: null, disabled: true },
    annualNitrogenOxidesExcretionFactor: { value: null, disabled: true },
    trashManagementSystem: { value: null, disabled: true },
    gasFactorMS: { value: null, disabled: true }
  });

  farmAssetForm = this.fb.group({
    farmId: [null, [Validators.required, Validators.maxLength(3), assetIdValidator()]],
    assetType: { value: null, disabled: true },
    name: { value: null, disabled: true },
    owner: { value: null, disabled: true },
    country: { value: null, disabled: true },
    createDateTime: { value: null, disabled: true },
    totalAnimals: { value: null, disabled: true }
  });

  assetTypes: any[] = [
    { value: 'BOTTLE' },
    { value: 'ANIMAL' },
    { value: 'FARM' },
  ];

  routeAssetType: number = 0;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private networkService: NetworkService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    let routeAssetId = "";
    this.route.queryParams
      .subscribe(params => {
        routeAssetId = params.assetId;
        this.routeAssetType = Number(params.assetType);
        switch (this.routeAssetType) {
          case 0:
            this.bottleAssetForm.controls.assetId.setValue(routeAssetId);
            this.onSubmit();
            break;
          case 1:
            this.animalAssetForm.controls.animalId.setValue(routeAssetId);
            this.onSubmitAnimal();
            break;
          case 2:
            this.farmAssetForm.controls.farmId.setValue(routeAssetId);
            this.onSubmitFarm();
            break;
        }
      }
      );

  }

  onClickAnimalId() {
    this.routeAssetType = 1;
    this.animalAssetForm.controls.animalId.setValue(this.bottleAssetForm.get('animalId').value.substring(1, this.bottleAssetForm.get('animalId').value.length));
    this.onSubmitAnimal();
  }

  onClickFarmId() {
    this.routeAssetType = 2;
    this.farmAssetForm.controls.farmId.setValue(this.animalAssetForm.get('farmId').value.substring(1, this.animalAssetForm.get('farmId').value.length));
    this.onSubmitFarm();
  }
  onSubmit() {
    this.isLoading = true;
    let assetId = this.bottleAssetForm.get('assetId').value;
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
          this.bottleAssetForm.controls.assetId.setValue(assetId);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  onSubmitAnimal() {
    this.isLoading = true;
    let searchId = this.animalAssetForm.get('animalId').value;
    this.networkService
      .queryAnimalAsset(
        this.assetTypes[1].value,
        this.animalAssetForm.get('animalId').value
      )
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The transaction finished successfully!`,
          });
          this.isLoading = false;
          this.animalAssetForm.setValue(data);
          this.animalAssetForm.controls.animalId.setValue(searchId);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  onSubmitFarm() {
    this.isLoading = true;
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
          this.farmAssetForm.controls.farmId.setValue(String(data.farmId).substr(1, data.farmId.length))
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
