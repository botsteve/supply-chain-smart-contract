import { JsonProperty } from 'typescript-json-serializer';

export class Asset {

    @JsonProperty('assetId')
    assetId: string;

    @JsonProperty('manufacturer')
    manufacturer: string;

    @JsonProperty('assetType')
    assetType: string;

    @JsonProperty('ownerName')
    ownerName: string;

    @JsonProperty('previousOwnerType')
    previousOwnerType: string;

    @JsonProperty('currentOwnerType')
    currentOwnerType: string;

    @JsonProperty('createDateTime')
    createDateTime: string;

    @JsonProperty('lastUpdated')
    lastUpdated: string;

    // constructor(assetId: string, manufacturer: string, assetType: string, ownerName: string, previousOwnerType: string, currentOwnerType: string, createDateTime: string, lastUpdated: string) {
    //     this.assetId = assetId;
    //     this.manufacturer = manufacturer;
    //     this.assetType = assetType;
    //     this.ownerName = ownerName;
    //     this.previousOwnerType = previousOwnerType;
    //     this.currentOwnerType = currentOwnerType;
    //     this.createDateTime = createDateTime;
    //     this.lastUpdated = lastUpdated;
    // }

    // constructor(assetId: string, manufacturer: string){
    //     this.assetId = assetId;
    //     this.manufacturer = manufacturer;
    // }
}