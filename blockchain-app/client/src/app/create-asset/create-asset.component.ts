import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NetworkService } from '../api/network.service';
import { Asset } from '../models/asset';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {
  assetForm = this.fb.group({
    assetId: [null, Validators.required],
    manufacturer: [null, Validators.required],
    assetType: [null, Validators.required],
    ownerName: [null, Validators.required]
  });

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private networkService: NetworkService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.assetForm.valid) {
      this.isLoading = true;
      let newAsset: Asset = Object.assign(
        new Asset(),
        this.assetForm.getRawValue()
      );
      this.networkService.createAsset(newAsset).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Transaction Success',
            detail: `The asset has been created successfully!`
          });
          this.isLoading=false;
        },
        error => {
          this.isLoading = false;
        }
      );
    }
  }
}
