import * as WalletMigration from "fabric-wallet-migration";
import { Wallet, Wallets } from "fabric-network"; // fabric-network v2

async function migrateWallet() {
    let oldWalletDirectory:string = '/home/steve/GIT/WalletMigration/Org1/';
    let newWalletDirectory:string = '/home/steve/GIT/WalletMigration/Org1Wallet';
    const walletStore = await WalletMigration.newFileSystemWalletStore(oldWalletDirectory);
    const oldWallet = new Wallet(walletStore);

    const newWallet = await Wallets.newFileSystemWallet(newWalletDirectory);

    const identityLabels = await oldWallet.list();
    for (const label of identityLabels) {
        const identity = await oldWallet.get(label);
        if (identity) {
            await newWallet.put(label, identity);
        }
    }
}
migrateWallet();