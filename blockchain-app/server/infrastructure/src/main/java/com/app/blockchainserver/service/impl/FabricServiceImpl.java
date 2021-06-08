package com.app.blockchainserver.service.impl;

import com.app.blockchainserver.service.config.BlockchainException;
import com.app.blockchainserver.service.IFabricService;
import com.app.blockchainserver.service.UpdateType;
import com.app.blockchainserver.service.model.*;
import com.app.blockchainserver.util.JsonUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hyperledger.fabric.gateway.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FabricServiceImpl implements IFabricService {

    private final Logger log = LoggerFactory.getLogger(FabricServiceImpl.class);

    private static Gateway.Builder builder;

    private final String CONTRACT_NAME = "blockchain-contract";
    private final String CHANNEL_NAME = "channel1";
    private final String QUERY_ALL = "queryAllAssets";
    private final String QUERY_SINGLE = "readMyAsset";
    private final String QUERY_HISTORY = "queryHistoryByKey";
    private final String CREATE_ASSET = "createMyAsset";
    private final String CREATE_COW_ASSET = "createCowAsset";
    private final String CREATE_FARM_ASSET = "createFarmAsset";
    private final String DISTRIBUTE_ASSET = "wholesalerDistribute";
    private final String RETAILER_ASSET = "retailerReceived";
    private final String SELL_ASSET = "sellAsset";
    private final String DELETE_ASSET = "deleteMyAsset";

    @Value("${wallet-path}")
    public String walletPath;

    @Value("${connection-path}")
    public String connectionPath;

    @PostConstruct
    public void setupConnection() throws IOException {

        // Load an existing wallet holding identities used to access the network.
        Path walletDirectory = Paths.get(walletPath);
        Wallet wallet  = Wallets.newFileSystemWallet(walletDirectory);
        Path networkConfigFile = Paths.get(connectionPath);
        builder = Gateway.createBuilder().identity(wallet, "Org1 Admin").networkConfig(networkConfigFile).discovery(false);

    }

    public TradeAssets readAllTradeTsAsset(String assetType) throws Exception {
        TradeAssets tradeAssets = new TradeAssets();
        String output;
        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_ALL, assetType);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAllTradeTsAsset completed : " + output);
        TradeAssetObj[] tradeArray = (TradeAssetObj[]) JsonUtil.getJsonToObject(output, TradeAssetObj[].class);

        if (tradeArray != null && tradeArray.length > 0)
            tradeAssets.setList(Arrays.stream(tradeArray).collect(Collectors.toList()));

        return tradeAssets;
    }

    public CowAssets readAllCowAsset(String assetType) throws Exception {
        CowAssets tradeAssets = new CowAssets();
        String output;
        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_ALL, assetType);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAllTradeTsAsset completed : " + output);
        CowAssetObj[] tradeArray = (CowAssetObj[]) JsonUtil.getJsonToObject(output, CowAssetObj[].class);

        if (tradeArray != null && tradeArray.length > 0)
            tradeAssets.setList(Arrays.stream(tradeArray).collect(Collectors.toList()));

        return tradeAssets;
    }


    public FarmAssets readAllFarmAsset(String assetType) throws Exception {
        FarmAssets tradeAssets = new FarmAssets();
        String output;
        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_ALL, assetType);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAllTradeTsAsset completed : " + output);
        FarmAssetObj[] tradeArray = (FarmAssetObj[]) JsonUtil.getJsonToObject(output, FarmAssetObj[].class);

        if (tradeArray != null && tradeArray.length > 0)
            tradeAssets.setList(Arrays.stream(tradeArray).collect(Collectors.toList()));

        return tradeAssets;
    }


    public TradeAsset readTradeAsset(String assetType, String tradeId) throws Exception {
        String output;

        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_SINGLE, tradeId, assetType);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAsset completed : " + output);
        TradeAsset tradeAsset = new ObjectMapper().readValue(output, TradeAsset.class);

        if (tradeAsset != null) {
            return tradeAsset;
        } else {
            throw new BlockchainException("No asset found with that id");
        }

    }

    @Override
    public CowAsset readCowAsset(String assetType, String tradeId) throws Exception {
        String output;

        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_SINGLE, tradeId, assetType);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAsset completed : " + output);
        CowAsset tradeAsset = new ObjectMapper().readValue(output, CowAsset.class);

        if (tradeAsset != null) {
            return tradeAsset;
        } else {
            throw new BlockchainException("No asset found with that id");
        }
    }

    @Override
    public FarmAsset readFarmAsset(String assetType, String tradeId) throws Exception {
        String output;

        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_SINGLE, tradeId, assetType);

        output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("readAsset completed : " + output);
        FarmAsset tradeAsset = new ObjectMapper().readValue(output, FarmAsset.class);

        if (tradeAsset != null) {
            return tradeAsset;
        } else {
            throw new BlockchainException("No asset found with that id");
        }
    }

    public void createTradeAsset(TradeAsset tradeAsset) throws Exception {
        String output;
        Contract contract = getContract();

        byte[] submitCreateTradeTsResult = contract.submitTransaction(CREATE_ASSET, tradeAsset.getAssetId(), tradeAsset.getManufacturer(), tradeAsset.getOwnerName(), tradeAsset.getCowId());

        output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
        log.info("createMyAsset completed : " + output);

    }

    @Override
    public void createCowAsset(CowAsset cowAsset) throws Exception {
        String output;
        Contract contract = getContract();

        byte[] submitCreateTradeTsResult = contract.submitTransaction(CREATE_COW_ASSET, cowAsset.getCowId(), cowAsset.getRace(), cowAsset.getAge(), cowAsset.getFood(), cowAsset.getBruteEnergy(),cowAsset.getConversionFactor(),cowAsset.getFarmId());

        output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
        log.info("createMyAsset completed : " + output);

    }

    @Override
    public void createFarmAsset(FarmAsset farmAsset) throws Exception {
        String output;
        Contract contract = getContract();

        byte[] submitCreateTradeTsResult = contract.submitTransaction(CREATE_FARM_ASSET, farmAsset.getFarmId(), farmAsset.getName(), farmAsset.getOwner(), farmAsset.getCountry());

        output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
        log.info("createMyAsset completed : " + output);

    }


    public void updateTradeAsset(UpdateType updateType, TradeAsset tradeAsset) throws Exception {
        String output;
        byte[] submitUpdateTsResult;
        Contract contract = getContract();

        switch (updateType) {
            case DISTRIBUTE:
                submitUpdateTsResult = contract.submitTransaction(DISTRIBUTE_ASSET, tradeAsset.getAssetId(), tradeAsset.getOwnerName());
                break;
            case RETAIL:
                submitUpdateTsResult = contract.submitTransaction(RETAILER_ASSET, tradeAsset.getAssetId(), tradeAsset.getOwnerName());
                break;
            case CONSUMER:
                submitUpdateTsResult = contract.submitTransaction(SELL_ASSET, tradeAsset.getAssetId());
                break;
            default:
                log.info("No update");
                throw new BlockchainException("ERROR: NO UPDATE");
        }

        output = new String(submitUpdateTsResult, StandardCharsets.UTF_8);
        log.info("updateMyAsset completed : " + output);

    }

    public void deleteTradeAsset(String tradeId) throws Exception {
        String output;
        Contract contract = getContract();

        byte[] submitCreateTradeTsResult = contract.submitTransaction(DELETE_ASSET, tradeId);

        output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
        log.info("deleteMyAsset completed : " + output);

    }

    @Override
    public List<TradeAsset> queryAssetHistoryByKey(String tradeId) throws Exception {

        Contract contract = getContract();

        byte[] queryTradeTsResult = contract.evaluateTransaction(QUERY_HISTORY, tradeId,"BOTTLE");

        String output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
        log.info("getHistoryByKey completed : " + output);
        List<TradeAsset> tradeAsset = new ObjectMapper().readValue(output, new TypeReference<List<TradeAsset>>(){});

        if (tradeAsset != null) {
            return tradeAsset;
        } else {
            throw new BlockchainException("No asset found with that id");
        }
    }

    private Contract getContract() {
        // Create a gateway connection
        Gateway gateway = builder.connect();

        // Obtain a smart contract deployed on the network.
        Network network = gateway.getNetwork(CHANNEL_NAME);

        return network.getContract(CONTRACT_NAME);
    }


}
