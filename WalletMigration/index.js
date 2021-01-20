"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var WalletMigration = require("fabric-wallet-migration");
var fabric_network_1 = require("fabric-network"); // fabric-network v2
function migrateWallet() {
    return __awaiter(this, void 0, void 0, function () {
        var oldWalletDirectory, newWalletDirectory, walletStore, oldWallet, newWallet, identityLabels, _i, identityLabels_1, label, identity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldWalletDirectory = '/home/steve/GIT/WalletMigration/Org1/';
                    newWalletDirectory = '/home/steve/GIT/WalletMigration/Org1Wallet';
                    return [4 /*yield*/, WalletMigration.newFileSystemWalletStore(oldWalletDirectory)];
                case 1:
                    walletStore = _a.sent();
                    oldWallet = new fabric_network_1.Wallet(walletStore);
                    return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(newWalletDirectory)];
                case 2:
                    newWallet = _a.sent();
                    return [4 /*yield*/, oldWallet.list()];
                case 3:
                    identityLabels = _a.sent();
                    _i = 0, identityLabels_1 = identityLabels;
                    _a.label = 4;
                case 4:
                    if (!(_i < identityLabels_1.length)) return [3 /*break*/, 8];
                    label = identityLabels_1[_i];
                    return [4 /*yield*/, oldWallet.get(label)];
                case 5:
                    identity = _a.sent();
                    if (!identity) return [3 /*break*/, 7];
                    return [4 /*yield*/, newWallet.put(label, identity)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 4];
                case 8: return [2 /*return*/];
            }
        });
    });
}
migrateWallet();
