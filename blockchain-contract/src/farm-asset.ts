import { Object, Property } from "fabric-contract-api";

@Object()
export class FarmAsset {
    @Property()
    public farmId: string;

    @Property()
    public name: string;

    @Property()
    public assetType: string;

    @Property()
    public country: string;

    @Property()
    public owner: string;

    @Property()
    public createDateTime: string;

    @Property()
    public totalAnimals: number;
}
