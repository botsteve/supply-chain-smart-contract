import { Object, Property } from "fabric-contract-api";

@Object()
export class CowAsset {
    @Property()
    public cowId: string;

    @Property()
    public assetType: string;

    @Property()
    public race: string;

    @Property()
    public age: string;

    @Property()
    public food: string;

    @Property()
    public bruteEnergy: string;

    @Property()
    public conversionFactor: string;

    @Property()
    public farmId: string;

    @Property()
    public createDateTime: string;
}
