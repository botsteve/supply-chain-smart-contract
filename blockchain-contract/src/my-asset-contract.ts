/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction,
} from "fabric-contract-api";
import { CowAsset } from "./cow-asset";
import { MilkBottle } from "./my-asset";
import { FarmAsset } from "./farm-asset";

enum ownerTypes {
    MANUFACTURER = "MANUFACTURER",
    WHOLESALER = "WHOLESALER",
    RETAILER = "RETAILER",
    CONSUMER = "CONSUMER",
}

enum assetTypes {
    BOTTLE = "BOTTLE",
    COW = "COW",
    FARM = "FARM",
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
    public async createFarmAsset(
        ctx: Context,
        farmId: string,
        name: string,
        ownerName: string,
        country: string
    ): Promise<void> {
        let newFarmId: string = `F${farmId}`;
        const exists: boolean = await this.myAssetExists(ctx, newFarmId);
        if (exists) {
            throw new Error(`The farm ${newFarmId} already exists`);
        }

        const myAsset: FarmAsset = new FarmAsset();
        let dt = new Date().toString();
        myAsset.farmId = newFarmId;
        myAsset.assetType = assetTypes.FARM;
        myAsset.owner = ownerName;
        myAsset.createDateTime = dt;
        myAsset.name = name;
        myAsset.country = country;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAsset.farmId, buffer);
    }

    @Transaction()
    public async createMyAsset(
        ctx: Context,
        myAssetId: string,
        manufacturer: string,
        ownerName: string,
        cowId: string
    ): Promise<void> {
        let newBottleId: string = `B${myAssetId}`;
        let searchCowId: string = `C${cowId}`;
        const exists: boolean = await this.myAssetExists(ctx, newBottleId);
        const cowExists: boolean = await this.myAssetExists(ctx, searchCowId);
        if (exists) {
            throw new Error(`The my asset ${newBottleId} already exists`);
        }
        if (!cowExists) {
            throw new Error(`The cow ${searchCowId} doesn't exists`);
        }

        const myAsset: MilkBottle = new MilkBottle();
        let dt = new Date().toString();
        myAsset.assetId = newBottleId;
        myAsset.assetType = assetTypes.BOTTLE;
        myAsset.manufacturer = manufacturer;
        myAsset.ownerName = ownerName;
        myAsset.previousOwnerType = ownerTypes.MANUFACTURER;
        myAsset.currentOwnerType = ownerTypes.MANUFACTURER;
        myAsset.createDateTime = dt;
        myAsset.lastUpdated = dt;
        myAsset.cowId = searchCowId;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAsset.assetId, buffer);
    }

    @Transaction()
    public async createCowAsset(
        ctx: Context,
        cowId: string,
        race: string,
        age: string,
        food: string,
        bruteEnergy: string,
        conversionFactor: string,
        farmId: string
    ): Promise<void> {
        let newCowId: string = `C${cowId}`;
        let searchFarmId: string = `F${farmId}`;
        const cowExists: boolean = await this.myAssetExists(ctx, newCowId);
        const farmExists: boolean = await this.myAssetExists(ctx, searchFarmId);
        if (cowExists) {
            throw new Error(`The cow ${newCowId} already exists`);
        }
        if (!farmExists) {
            throw new Error(`The farm ${searchFarmId} doesn't exists`);
        }

        const cowAsset: CowAsset = new CowAsset();
        let dt = new Date().toString();
        cowAsset.cowId = newCowId;
        cowAsset.assetType = assetTypes.COW;
        cowAsset.age = age;
        cowAsset.race = race;
        cowAsset.food = food;
        cowAsset.bruteEnergy = bruteEnergy;
        cowAsset.conversionFactor = conversionFactor;
        cowAsset.createDateTime = dt;
        cowAsset.farmId = searchFarmId;

        const buffer: Buffer = Buffer.from(JSON.stringify(cowAsset));
        await ctx.stub.putState(cowAsset.cowId, buffer);
    }

    @Transaction(false)
    @Returns("MyAsset")
    public async readMyAsset(
        ctx: Context,
        myAssetId: string,
        assetType: string
    ): Promise<any> {
        let data: Uint8Array;
        let exists: boolean;

        switch (assetType.valueOf()) {
            case assetTypes.BOTTLE.valueOf():
                exists = await this.myAssetExists(ctx, `B${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The BOTTLE asset B${myAssetId} does not exist`
                    );
                }
                data = await ctx.stub.getState(`B${myAssetId}`);
                return JSON.parse(data.toString()) as MilkBottle;
            case assetTypes.COW.valueOf():
                exists = await this.myAssetExists(ctx, `C${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The COW asset C${myAssetId} does not exist`
                    );
                }
                data = await ctx.stub.getState(`C${myAssetId}`);
                return JSON.parse(data.toString()) as CowAsset;
            case assetTypes.FARM.valueOf():
                exists = await this.myAssetExists(ctx, `F${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The FARM asset F${myAssetId} does not exist`
                    );
                }
                data = await ctx.stub.getState(`F${myAssetId}`);
                return JSON.parse(data.toString()) as FarmAsset;
        }
    }

    @Transaction()
    public async wholesalerDistribute(
        ctx: Context,
        myAssetId: string,
        ownerName: string
    ): Promise<MilkBottle> {
        let searchedAssetId: string = `B${myAssetId}`;

        const exists: boolean = await this.myAssetExists(ctx, searchedAssetId);
        if (!exists) {
            throw new Error(`The my asset ${searchedAssetId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(searchedAssetId);
        let myAsset: MilkBottle = JSON.parse(data.toString()) as MilkBottle;

        let dt = new Date().toString();
        if (myAsset.currentOwnerType !== ownerTypes.MANUFACTURER) {
            throw new Error(
                `equipment - ${searchedAssetId} owner must be ${ownerTypes.MANUFACTURER}`
            );
        }
        myAsset.previousOwnerType = myAsset.currentOwnerType;
        myAsset.currentOwnerType = ownerTypes.WHOLESALER;
        myAsset.ownerName = ownerName;
        myAsset.lastUpdated = dt;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAsset.assetId, buffer);
        return myAsset;
    }

    @Transaction()
    public async retailerReceived(
        ctx: Context,
        myAssetId: string,
        ownerName: string
    ): Promise<MilkBottle> {
        let searchedAssetId: string = `B${myAssetId}`;
        const exists: boolean = await this.myAssetExists(ctx, searchedAssetId);
        if (!exists) {
            throw new Error(`The my asset ${searchedAssetId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(searchedAssetId);
        let myAsset: MilkBottle = JSON.parse(data.toString()) as MilkBottle;

        let dt = new Date().toString();
        if (myAsset.currentOwnerType !== ownerTypes.WHOLESALER) {
            throw new Error(
                `equipment - ${searchedAssetId} owner must be ${ownerTypes.WHOLESALER}`
            );
        }
        myAsset.previousOwnerType = myAsset.currentOwnerType;
        myAsset.currentOwnerType = ownerTypes.RETAILER;
        myAsset.ownerName = ownerName;
        myAsset.lastUpdated = dt;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAsset.assetId, buffer);
        return myAsset;
    }

    @Transaction()
    public async sellAsset(
        ctx: Context,
        myAssetId: string
    ): Promise<MilkBottle> {
        let searchedAssetId: string = `B${myAssetId}`;
        const exists: boolean = await this.myAssetExists(ctx, searchedAssetId);
        if (!exists) {
            throw new Error(`The my asset ${searchedAssetId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(searchedAssetId);
        let myAsset: MilkBottle = JSON.parse(data.toString()) as MilkBottle;

        let dt = new Date().toString();
        if (myAsset.currentOwnerType !== ownerTypes.RETAILER) {
            throw new Error(
                `equipment - ${searchedAssetId} owner must be ${ownerTypes.RETAILER}`
            );
        }
        myAsset.previousOwnerType = myAsset.currentOwnerType;
        myAsset.currentOwnerType = ownerTypes.CONSUMER;
        myAsset.ownerName = "<REDACTED>";
        myAsset.lastUpdated = dt;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAsset.assetId, buffer);
        return myAsset;
    }

    @Transaction(false)
    public async queryHistoryByKey(
        ctx: Context,
        myAssetId: string,
        assetType: string
    ): Promise<string> {
        let exists: boolean;
        let key: string;
        switch (assetType.valueOf()) {
            case assetTypes.BOTTLE.valueOf():
                exists = await this.myAssetExists(ctx, `B${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The BOTTLE asset B${myAssetId} does not exist`
                    );
                } else {
                    key = `B${myAssetId}`;
                }
                break;
            case assetTypes.COW.valueOf():
                exists = await this.myAssetExists(ctx, `C${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The COW asset C${myAssetId} does not exist`
                    );
                } else {
                    key = `C${myAssetId}`;
                }
                break;
            case assetTypes.FARM.valueOf():
                exists = await this.myAssetExists(ctx, `F${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The FARM asset F${myAssetId} does not exist`
                    );
                } else {
                    key = `F${myAssetId}`;
                }
                break;
        }

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
    public async queryAllAssets(
        ctx: Context,
        assetType: string
    ): Promise<string> {
        let startKey: string;
        let endKey: string;
        switch (assetType.valueOf()) {
            case assetTypes.BOTTLE.valueOf():
                startKey = `B000`;
                endKey = `B999`;
                break;
            case assetTypes.COW.valueOf():
                startKey = `C000`;
                endKey = `C999`;
                break;
            case assetTypes.FARM.valueOf():
                startKey = `F000`;
                endKey = `F999`;
                break;
        }

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
