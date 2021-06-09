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
import { AnimalAsset } from "./animal-asset";
import { MilkBottle } from "./my-asset";
import { FarmAsset } from './farm-asset';

enum ownerTypes {
    MANUFACTURER = "MANUFACTURER",
    WHOLESALER = "WHOLESALER",
    RETAILER = "RETAILER",
    CONSUMER = "CONSUMER",
}

enum assetTypes {
    BOTTLE = "BOTTLE",
    ANIMAL = "ANIMAL",
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
    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        let dt = new Date().toString();
        let farm: FarmAsset = new FarmAsset();
        farm.name = "testName"
        farm.assetType = assetTypes.FARM;
        farm.createDateTime = dt;
        farm.country = "Romania";
        farm.owner = "testOwner";
        for (let i = 1; i <= 9; i++) {
            farm.farmId = `F00${i}`;
            farm.totalAnimals = 0;
            if(i==1){
                farm.totalAnimals=9;
            }
            await ctx.stub.putState(farm.farmId, Buffer.from(JSON.stringify(farm)));
        }

        let animalAsset: AnimalAsset = new AnimalAsset();
        animalAsset.assetType = assetTypes.ANIMAL;
        animalAsset.age = 2;
        animalAsset.race = "testRace";
        animalAsset.food = "testFood";
        animalAsset.weight = 100;
        animalAsset.grossEnergyConsumption = "test";
        animalAsset.foodDigestibility = "test";
        animalAsset.urinaryEnergy = "test";
        animalAsset.treatedStableTrashFactor = "test";
        animalAsset.annualNitrogenOxidesExcretionFactor = "test";
        animalAsset.trashManagementSystem = "test";
        animalAsset.gasFactorMS = "test";
        animalAsset.animalCategory = "BOVINE";
        animalAsset.animalSubCategory = "SUBCATEGORY"
        animalAsset.createDateTime = dt;
        animalAsset.farmId = "F001";
        for (let i = 1; i <= 9; i++) {
            animalAsset.animalId = `A00${i}`;
            await ctx.stub.putState(animalAsset.animalId, Buffer.from(JSON.stringify(animalAsset)));
        }


        let bottleAsset: MilkBottle = new MilkBottle();
        bottleAsset.assetType = assetTypes.BOTTLE;
        bottleAsset.manufacturer = "testManufacturer";
        bottleAsset.ownerName = "testManufacturer";
        bottleAsset.previousOwnerType = ownerTypes.MANUFACTURER;
        bottleAsset.currentOwnerType = ownerTypes.MANUFACTURER;
        bottleAsset.createDateTime = dt;
        bottleAsset.lastUpdated = dt;
        bottleAsset.animalId = "A001";
        for (let i = 1; i <= 9; i++) {
            bottleAsset.assetId = `B00${i}`;
            await ctx.stub.putState(bottleAsset.assetId, Buffer.from(JSON.stringify(bottleAsset)));
        }

        console.info('============= END : Initialize Ledger ===========');

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
        myAsset.totalAnimals = 0;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAsset.farmId, buffer);
    }

    @Transaction()
    public async createMyAsset(
        ctx: Context,
        myAssetId: string,
        manufacturer: string,
        ownerName: string,
        animalId: string
    ): Promise<void> {
        let newBottleId: string = `B${myAssetId}`;
        let searchAnimalId: string = `A${animalId}`;
        const exists: boolean = await this.myAssetExists(ctx, newBottleId);
        const animalExists: boolean = await this.myAssetExists(ctx, searchAnimalId);
        if (exists) {
            throw new Error(`The bottle asset ${newBottleId} already exists`);
        }
        if (!animalExists) {
            throw new Error(`The animal ${searchAnimalId} doesn't exists`);
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
        myAsset.animalId = searchAnimalId;

        const buffer: Buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAsset.assetId, buffer);
    }

    @Transaction()
    public async createAnimalAsset(
        ctx: Context,
        animalId: string,
        animalCategory: string,
        animalSubCategory: string,
        race: string,
        age: number,
        food: string,
        weight: number,
        grossEnergyConsumption: string,
        foodDigestibility: string,
        urinaryEnergy: string,
        treatedStableTrashFactor: string,
        annualNitrogenOxidesExcretionFactor: string,
        trashManagementSystem: string,
        gasFactorMS: string,
        farmId: string
    ): Promise<void> {
        let newAnimalId: string = `A${animalId}`;
        let searchFarmId: string = `F${farmId}`;
        const cowExists: boolean = await this.myAssetExists(ctx, newAnimalId);
        const farmExists: boolean = await this.myAssetExists(ctx, searchFarmId);
        if (cowExists) {
            throw new Error(`The animal ${newAnimalId} already exists`);
        }
        if (!farmExists) {
            throw new Error(`The farm ${searchFarmId} doesn't exists`);
        }

        const animalAsset: AnimalAsset = new AnimalAsset();
        let dt = new Date().toString();
        animalAsset.animalId = newAnimalId;
        animalAsset.assetType = assetTypes.ANIMAL;
        animalAsset.age = age;
        animalAsset.race = race;
        animalAsset.food = food;
        animalAsset.weight = weight;
        animalAsset.grossEnergyConsumption = grossEnergyConsumption;
        animalAsset.foodDigestibility = foodDigestibility;
        animalAsset.urinaryEnergy = urinaryEnergy;
        animalAsset.treatedStableTrashFactor = treatedStableTrashFactor;
        animalAsset.annualNitrogenOxidesExcretionFactor = annualNitrogenOxidesExcretionFactor;
        animalAsset.trashManagementSystem = trashManagementSystem;
        animalAsset.gasFactorMS = gasFactorMS;
        animalAsset.animalCategory = animalCategory;
        animalAsset.animalSubCategory = animalSubCategory;
        animalAsset.createDateTime = dt;
        animalAsset.farmId = searchFarmId;

        let data: Uint8Array = await ctx.stub.getState(animalAsset.farmId);
        let farmAsset: FarmAsset = JSON.parse(data.toString()) as FarmAsset;
        farmAsset.totalAnimals++;

        const bufferFarm: Buffer = Buffer.from(JSON.stringify(farmAsset));
        await ctx.stub.putState(farmAsset.farmId, bufferFarm);

        const buffer: Buffer = Buffer.from(JSON.stringify(animalAsset));
        await ctx.stub.putState(animalAsset.animalId, buffer);
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
            case assetTypes.ANIMAL.valueOf():
                exists = await this.myAssetExists(ctx, `A${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The Animal asset A${myAssetId} does not exist`
                    );
                }
                data = await ctx.stub.getState(`A${myAssetId}`);
                return JSON.parse(data.toString()) as AnimalAsset;
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
            case assetTypes.ANIMAL.valueOf():
                exists = await this.myAssetExists(ctx, `A${myAssetId}`);
                if (!exists) {
                    throw new Error(
                        `The Animal asset A${myAssetId} does not exist`
                    );
                } else {
                    key = `A${myAssetId}`;
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
            case assetTypes.ANIMAL.valueOf():
                startKey = `A000`;
                endKey = `A999`;
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
