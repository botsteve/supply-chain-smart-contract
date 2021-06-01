/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction
} from "fabric-contract-api";
import { MyAsset } from "./my-asset";


enum ownerTypes {
    MANUFACTURER = 'MANUFACTURER',
    WHOLESALER = 'WHOLESALER',
    RETAILER = 'RETAILER'
}

@Info({ title: "MyAssetContract", description: "My Smart Contract" })
export class MyAssetContract extends Contract {
    @Transaction(false)
    @Returns("boolean")
    public async myAssetExists(
        ctx: Context,
        myAssetId: string
    ): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(myAssetId);
        return !!data && data.length > 0;
    }

    @Transaction()
    public async createMyAsset(
        ctx: Context,
        myAssetId: string,
        manufacturer: string,
        assetType: string,
        ownerName: string
    ): Promise<void> {
        const exists: boolean = await this.myAssetExists(ctx, myAssetId);
        if (exists) {
            throw new Error(`The my asset ${myAssetId} already exists`);
        }
        const myAsset: MyAsset = new MyAsset();
        let dt = new Date().toString();
        myAsset.assetId = myAssetId;
        myAsset.assetType = assetType;
        myAsset.manufacturer = manufacturer;
        myAsset.ownerName = ownerName;
        myAsset.previousOwnerType = ownerTypes.MANUFACTURER;
        myAsset.currentOwnerType = ownerTypes.MANUFACTURER;
        myAsset.createDateTime = dt;
        myAsset.lastUpdated = dt;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    @Transaction(false)
    @Returns("MyAsset")
    public async readMyAsset(
        ctx: Context,
        myAssetId: string
    ): Promise<MyAsset> {
        const exists: boolean = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(myAssetId);
        const myAsset: MyAsset = JSON.parse(data.toString()) as MyAsset;
        return myAsset;
    }

    @Transaction()
    public async wholesalerDistribute(
        ctx: Context,
        myAssetId: string,
        ownerName: string
    ): Promise<void> {
        const exists: boolean = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(myAssetId);
        let myAsset: MyAsset = JSON.parse(data.toString()) as MyAsset;

        let dt = new Date().toString();
        if (myAsset.currentOwnerType !== ownerTypes.MANUFACTURER) {
            throw new Error(
                `equipment - ${myAssetId} owner must be ${ownerTypes.MANUFACTURER}`
            );
        }
        myAsset.previousOwnerType = myAsset.currentOwnerType;
        myAsset.currentOwnerType = ownerTypes.WHOLESALER;
        myAsset.ownerName = ownerName;
        myAsset.lastUpdated = dt;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    @Transaction()
    public async retailerReceived(
        ctx: Context,
        myAssetId: string,
        ownerName: string
    ): Promise<void> {
        const exists: boolean = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(myAssetId);
        let myAsset: MyAsset = JSON.parse(data.toString()) as MyAsset;

        let dt = new Date().toString();
        if (myAsset.currentOwnerType !== ownerTypes.WHOLESALER) {
            throw new Error(
                `equipment - ${myAssetId} owner must be ${ownerTypes.WHOLESALER}`
            );
        }
        myAsset.previousOwnerType = myAsset.currentOwnerType;
        myAsset.currentOwnerType = ownerTypes.RETAILER;
        myAsset.ownerName = ownerName;
        myAsset.lastUpdated = dt;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    @Transaction(false)
    public async queryHistoryByKey(ctx: Context, key: string): Promise<string> {
        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                const obj = JSON.parse(res.value.value.toString());
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();
        console.info(result);
        return JSON.stringify(result);
    }

    @Transaction(false)
    public async queryAllAssets(ctx: Context): Promise<string> {
        const startKey = "000";
        const endKey = "999";
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString());

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString());
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString();
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log("end of data");
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }
}
