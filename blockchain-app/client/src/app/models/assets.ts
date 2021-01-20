import { Asset } from './asset';

import { JsonProperty } from 'typescript-json-serializer';
export class TradeAssets {
    @JsonProperty('tradeAssets')
    public tradeAssets: Asset[] = []
}