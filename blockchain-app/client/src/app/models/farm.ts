import { JsonProperty } from 'typescript-json-serializer';

export class Farm {
  @JsonProperty()
  public farmId: string;

  @JsonProperty()
  public name: string;

  @JsonProperty()
  public assetType: string;

  @JsonProperty()
  public country: string;

  @JsonProperty()
  public owner: string;

  @JsonProperty()
  public createDateTime: string;
}
