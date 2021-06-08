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

    @JsonProperty('animalId')
    animalId: string;

    @JsonProperty('lastUpdated')
    lastUpdated: string;
}