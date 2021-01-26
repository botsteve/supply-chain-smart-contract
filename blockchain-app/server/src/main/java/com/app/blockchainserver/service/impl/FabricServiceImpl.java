package com.app.blockchainserver.service.impl;

import com.app.blockchainserver.service.IFabricService;
import com.app.blockchainserver.service.model.TradeAsset;
import com.app.blockchainserver.service.model.TradeAssetObj;
import com.app.blockchainserver.service.model.TradeAssets;
import com.app.blockchainserver.service.model.Value;
import com.app.blockchainserver.util.JsonUtil;
import org.hyperledger.fabric.gateway.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.stream.Collectors;

@Component
public class FabricServiceImpl implements IFabricService {

    private final Logger log = LoggerFactory.getLogger(FabricServiceImpl.class);

    private static Gateway.Builder builder;

    private final String CONTRACT_NAME = "blockchain-contract";
    private final String CHANNEL_NAME = "mychannel";
    private final String QUERY_ALL = "queryAllAssets";
    private final String QUERY_SINGLE = "readMyAsset";
    private final String CREATE_ASSET = "createMyAsset";
    private final String UPDATE_ASSET = "updateMyAsset";
    private final String DELETE_ASSET = "deleteMyAsset";

    @PostConstruct
    public void setupConnection() throws IOException {

        // Load an existing wallet holding identities used to access the network.
        Path walletDirectory = Paths.get("local_fabric_wallet/Org1");
        Wallet wallet;

        wallet = Wallets.newFileSystemWallet(walletDirectory);
        Path networkConfigFile = Paths.get("local_fabric_wallet/connection.json");
        builder = Gateway.createBuilder().identity(wallet, "Org1 Admin").networkConfig(networkConfigFile).discovery(false);

    }

    public TradeAssets readAllTradeTsAsset() throws Exception {
        TradeAssets tradeAssets = new TradeAssets();
        String output;
        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_ALL);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAllTradeTsAsset completed : " + output);
        TradeAssetObj[] tradeArray = (TradeAssetObj[]) JsonUtil.getJsonToObject(output, TradeAssetObj[].class);

        if (tradeArray != null && tradeArray.length > 0)
            tradeAssets.setList(Arrays.stream(tradeArray).collect(Collectors.toList()));

        return tradeAssets;
    }

    public TradeAsset readTradeAsset(String tradeId) throws Exception {
        TradeAsset tradeAssetResponse = new TradeAsset();
        String output;

        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_SINGLE, tradeId);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAllTradeTsAsset completed : " + output);
        Value tradeAsset = (Value) JsonUtil.getJsonToObject(output, Value.class);

        if (tradeAsset != null) {
            tradeAssetResponse.setTradeId(tradeId);
            tradeAssetResponse.setValue(tradeAsset.getValue());
        }

        return tradeAssetResponse;
    }


    public void createTradeAsset(TradeAsset tradeAsset) throws Exception {
        String output;
        Contract contract = getContract();

        byte[] submitCreateTradeTsResult = contract.submitTransaction(CREATE_ASSET, tradeAsset.getTradeId(), tradeAsset.getValue());

        output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
        log.info("createMyAsset completed : " + output);

    }

    public void updateTradeAsset(TradeAsset tradeAsset) throws Exception {
        String output;
        Contract contract = getContract();

        byte[] submitCreateTradeTsResult = contract.submitTransaction(UPDATE_ASSET, tradeAsset.getTradeId(), tradeAsset.getValue());

        output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
        log.info("updateMyAsset completed : " + output);

    }

    public void deleteTradeAsset(String tradeId) throws Exception {
        String output;
        Contract contract = getContract();

        byte[] submitCreateTradeTsResult = contract.submitTransaction(DELETE_ASSET, tradeId);

        output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
        log.info("deleteMyAsset completed : " + output);

    }

    private Contract getContract() {
        // Create a gateway connection
        Gateway gateway = builder.connect();

        // Obtain a smart contract deployed on the network.
        Network network = gateway.getNetwork(CHANNEL_NAME);

        return network.getContract(CONTRACT_NAME);
    }


}
