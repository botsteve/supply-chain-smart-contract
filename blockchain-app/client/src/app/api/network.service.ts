import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';
import { Farm } from '../models/farm';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private BASE_URL: string = "http://82.76.120.223:8081/";

  constructor(private httpClient: HttpClient) { }

  public queryAllBottleAssets(assetType: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAllBottleAssets/' + assetType);
  }

  public queryAllAnimalAssets(assetType: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAllAnimalAssets/' + assetType);
  }

  public queryAllFarmAssets(assetType: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAllFarmAssets/' + assetType);
  }

  public queryBottleAsset(assetType: string, tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryBottleAsset/'+ assetType + "/" + tradeId);
  }

  public queryAnimalAsset(assetType: string, tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAnimalAsset/'+ assetType + "/" + tradeId);
  }

  public queryFarmAsset(assetType: string, tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryFarmAsset/'+ assetType + "/" + tradeId);
  }


  public queryAssetHistoryByKey(tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAssetHistoryByKey/' + tradeId);
  }

  public createBottleAsset(tradeAsset: Asset): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'createBottleAsset/', tradeAsset);
  }

  public createAnimalAsset(tradeAsset: Animal): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'createAnimalAsset/', tradeAsset);
  }

  public createFarmAsset(tradeAsset: Farm): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'createBottleAsset/', tradeAsset);
  }

  public wholesalerDistribute(tradeAsset: Asset): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'wholesalerDistribute/', tradeAsset);
  }

  public retailerReceived(tradeAsset: Asset): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'retailerReceived/', tradeAsset);
  }

  public sellAsset(tradeAsset: Asset): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'sellAsset/', tradeAsset);
  }

  public deleteAsset(tradeId: string): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'deleteAsset/' + tradeId, {});
  }

}
