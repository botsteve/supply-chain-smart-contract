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
        myAsset.previousOwnerType = "MANUFACTURER";
        myAsset.currentOwnerType = "MANUFACTURER";
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

    async wholesalerDistribute(ctx, equipmentNumber, ownerName) {
        const equipmentAsBytes = await ctx.stub.getState(equipmentNumber);
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`${equipmentNumber} does not exist`);
        }
        let dt = new Date().toString();
        const strValue = Buffer.from(equipmentAsBytes).toString("utf8");
        let record;
        try {
            record = JSON.parse(strValue);
            if (record.currentOwnerType !== "MANUAFACTURER") {
                throw new Error(
                    ` equipment - ${equipmentNumber} owner must be MANUAFACTURER`
                );
            }
            record.previousOwnerType = record.currentOwnerType;
            record.currentOwnerType = "WHOLESALER";
            record.ownerName = ownerName;
            record.lastUpdated = dt;
        } catch (err) {
            throw new Error(
                `equipmet ${equipmentNumber} data can't be processed`
            );
        }
        await ctx.stub.putState(
            equipmentNumber,
            Buffer.from(JSON.stringify(record))
        );
    }

    async retailerReceived(ctx, assetId, ownerName) {
        const equipmentAsBytes = await ctx.stub.getState(assetId);
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`${assetId} does not exist`);
        }
        let dt = new Date().toString();
        const strValue = Buffer.from(equipmentAsBytes).toString("utf8");
        let record;
        try {
            record = JSON.parse(strValue);

            if (record.currentOwnerType !== "WHOLESALER") {
                throw new Error(
                    ` equipment - ${assetId} owner must be WHOLESALER`
                );
            }
            record.previousOwnerType = record.currentOwnerType;
            record.currentOwnerType = "RETAILER";
            record.ownerName = ownerName;
            record.lastUpdated = dt;
        } catch (err) {
            throw new Error(`equipmet ${assetId} data can't be processed`);
        }
        await ctx.stub.putState(assetId, Buffer.from(JSON.stringify(record)));
    }

    async queryHistoryByKey(ctx, key) {
        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                const obj = JSON.parse(res.value.value.toString("utf8"));
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
