import { Object, Property } from "fabric-contract-api";

@Object()
export class AnimalAsset {
    @Property()
    public animalId: string;

    @Property()
    public assetType: string;

    @Property()
    public animalCategory: string;

    @Property()
    public animalSubCategory: string;

    @Property()
    public age: number;

    @Property()
    public food: string;

    @Property()
    public farmId: string;

    @Property()
    public createDateTime: string;

    //Module A
    @Property()
    public grossEnergyConsumption: string;

    @Property()
    public foodDigestibility: string;

    @Property()
    public urinaryEnergy: string;

    @Property()
    public treatedStableTrashFactor: string;

    //Module B

    @Property()
    public weight: number;

    @Property()
    public annualNitrogenOxidesExcretionFactor: string;

    @Property()
    public trashManagementSystem: string;

    //Module C

    @Property()
    public gasFactorMS: string;
}
