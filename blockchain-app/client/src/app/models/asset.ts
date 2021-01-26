import { JsonProperty } from 'typescript-json-serializer';

export class Asset {
    @JsonProperty('tradeId')
    public tradeId: string;
    @JsonProperty('value')
    public value: string;

    constructor(tradeId: string, value: string) {
        this.tradeId = tradeId;
        this.value = value;
    }
}