import { JsonProperty } from 'typescript-json-serializer';

export class Cow {
    @JsonProperty()
    public cowId: string;

    @JsonProperty()
    public assetType: string;

    @JsonProperty()
    public race: string;

    @JsonProperty()
    public age: string;

    @JsonProperty()
    public food: string;

    @JsonProperty()
    public bruteEnergy: string;

    @JsonProperty()
    public conversionFactor: string;

    @JsonProperty()
    public farmId: string;

    @JsonProperty()
    public createDateTime: string;
}