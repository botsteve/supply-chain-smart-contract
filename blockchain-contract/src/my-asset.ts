/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from "fabric-contract-api";

@Object()
export class MilkBottle {
    @Property()
    public assetId: string;

    @Property()
    public manufacturer: string;

    @Property()
    public assetType: string;

    @Property()
    public ownerName: string;

    @Property()
    public previousOwnerType: string;

    @Property()
    public currentOwnerType: string;

    @Property()
    public createDateTime: string;

    @Property()
    public lastUpdated: string;

    @Property()
    public cowId: string;
}
