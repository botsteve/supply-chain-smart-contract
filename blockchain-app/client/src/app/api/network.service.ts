import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';
import { Farm } from '../models/farm';
import { Cow } from '../models/cow';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private BASE_URL: string = "http://localhost:8081/";

  constructor(private httpClient: HttpClient) { }

  public queryAllBottleAssets(assetType: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAllBottleAssets/' + assetType);
  }

  public queryAllCowAssets(assetType: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAllCowAssets/' + assetType);
  }

  public queryAllFarmAssets(assetType: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAllFarmAssets/' + assetType);
  }

  public queryBottleAsset(assetType: string, tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryBottleAsset/'+ assetType + "/" + tradeId);
  }

  public queryCowAsset(assetType: string, tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryCowAsset/'+ assetType + "/" + tradeId);
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

  public createCowAsset(tradeAsset: Cow): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'createBottleAsset/', tradeAsset);
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
