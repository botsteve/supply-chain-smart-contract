import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private BASE_URL: string = "http://localhost:8081/";

  constructor(private httpClient: HttpClient) { }

  public queryAllAssets(): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAllAssets/');
  }

  public queryAsset(tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAsset/' + tradeId);
  }

  public queryAssetHistoryByKey(tradeId: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'queryAssetHistoryByKey/' + tradeId);
  }

  public createAsset(tradeAsset: Asset): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'createAsset/', tradeAsset);
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

  public displayConnection(): Observable<any> {
    return this.httpClient.get(this.BASE_URL + 'displayConnection/');
  }
}
