import { JsonProperty } from 'typescript-json-serializer';

export class Animal {
    @JsonProperty()
    public animalId: string;

    @JsonProperty()
    public assetType: string;

    @JsonProperty()
    public race: string;

    @JsonProperty()
    public age: number;

    @JsonProperty()
    public food: string;

    @JsonProperty()
    public farmId: string;

    @JsonProperty()
    public createDateTime: string;

    @JsonProperty()
    public animalCategory: string;

    @JsonProperty()
    public animalSubCategory: string;


    //Module A
    @JsonProperty()
    public grossEnergyConsumption: string;

    @JsonProperty()
    public foodDigestibility: string;

    @JsonProperty()
    public urinaryEnergy: string;

    @JsonProperty()
    public treatedStableTrashFactor: string;

    //Module B

    @JsonProperty()
    public weight: number;

    @JsonProperty()
    public annualNitrogenOxidesExcretionFactor: string;

    @JsonProperty()
    public trashManagementSystem: string;

    //Module C

    @JsonProperty()
    public gasFactorMS: string;
}