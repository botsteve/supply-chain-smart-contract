package com.app.blockchainserver.service.impl;

import com.app.blockchainserver.config.BlockchainException;
import com.app.blockchainserver.service.IFabricService;
import com.app.blockchainserver.service.model.TradeAsset;
import com.app.blockchainserver.service.model.TradeAssetObj;
import com.app.blockchainserver.service.model.TradeAssets;
import com.app.blockchainserver.service.model.Value;
import com.app.blockchainserver.util.JsonUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hyperledger.fabric.gateway.*;
import org.hyperledger.fabric.gateway.impl.NetworkImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class FabricServiceImpl implements IFabricService {

    private Logger log = LoggerFactory.getLogger(FabricServiceImpl.class);

    private static Gateway.Builder builder;

    private String contractName = "blockchain-contract";
    private String channelName = "mychannel";

    @PostConstruct
    public void setupConnection() {

        // Load an existing wallet holding identities used to access the network.
        Path walletDirectory = Paths.get("local_fabric_wallet/Org1");
        Wallet wallet;

        try {
            wallet = Wallets.newFileSystemWallet(walletDirectory);
            Path networkConfigFile = Paths.get("local_fabric_wallet/connection.json");
            builder = Gateway.createBuilder().identity(wallet, "Org1 Admin").networkConfig(networkConfigFile).discovery(false);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public TradeAssets readAllTradeTsAsset() throws Exception {

        TradeAssets tradeAssets = new TradeAssets();
        List<TradeAssetObj> list = new ArrayList<>();
        String output = null;

        // Create a gateway connection
        try (Gateway gateway = builder.connect()) {

            // Obtain a smart contract deployed on the network.
            Network network = gateway.getNetwork(channelName);

            Contract contract = network.getContract(contractName);

            byte[] queryTradeTsResult = contract.evaluateTransaction("queryAllAssets");

            output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
            log.info("readAllTradeTsAsset completed : " + output);
            System.out.println("read");

            TradeAssetObj[] tradeArray = (TradeAssetObj[]) JsonUtil.getJsonToObject(output, TradeAssetObj[].class);

            for (TradeAssetObj obj : tradeArray) {
                list.add(obj);
            }

            tradeAssets.setList(list);
        }

        return tradeAssets;
    }

    public TradeAsset readTradeAsset(String tradeId) throws Exception {

        TradeAsset tradeAssetResponse = new TradeAsset();
        String output = null;

        // Create a gateway connection
        try (Gateway gateway = builder.connect()) {

            // Obtain a smart contract deployed on the network.
            Network network = gateway.getNetwork(channelName);

            Contract contract = network.getContract(contractName);

            byte[] queryTradeTsResult = contract.evaluateTransaction("readMyAsset", tradeId);

            output = new String(queryTradeTsResult, StandardCharsets.UTF_8);
            log.info("readAllTradeTsAsset completed : " + output);
            Value tradeAsset = (Value) JsonUtil.getJsonToObject(output, Value.class);

            if (tradeAsset != null) {
                tradeAssetResponse.setTradeId(tradeId);
                tradeAssetResponse.setValue(tradeAsset.getValue());
            }
        } catch (ContractException e) {
            throw new BlockchainException(e.getLocalizedMessage());
        }

        return tradeAssetResponse;
    }


    public void createTradeAsset(TradeAsset tradeAsset) throws Exception {

        String output = null;

        // Create a gateway connection
        try (Gateway gateway = builder.connect()) {

            // Obtain a smart contract deployed on the network.
            Network network = gateway.getNetwork(channelName);

            Contract contract = network.getContract(contractName);

            byte[] submitCreateTradeTsResult = contract.submitTransaction("createMyAsset", tradeAsset.getTradeId(), tradeAsset.getValue());

            output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
            log.info("createMyAsset completed : " + output);
        } catch (ContractException e) {
            throw new BlockchainException(e.getLocalizedMessage());
        }

    }

    public void updateTradeAsset(TradeAsset tradeAsset) throws Exception {

        String output = null;

        // Create a gateway connection
        try (Gateway gateway = builder.connect()) {

            // Obtain a smart contract deployed on the network.
            Network network = gateway.getNetwork(channelName);

            Contract contract = network.getContract(contractName);

            byte[] submitCreateTradeTsResult = contract.submitTransaction("updateMyAsset", tradeAsset.getTradeId(), tradeAsset.getValue());

            output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
            log.info("updateMyAsset completed : " + output);
        } catch (ContractException e) {
            throw new BlockchainException(e.getLocalizedMessage());
        }

    }

    public void deleteTradeAsset(String tradeId) throws Exception {

        String output = null;

        // Create a gateway connection
        try (Gateway gateway = builder.connect()) {

            // Obtain a smart contract deployed on the network.
            Network network = gateway.getNetwork(channelName);

            Contract contract = network.getContract(contractName);

            byte[] submitCreateTradeTsResult = contract.submitTransaction("deleteMyAsset", tradeId);

            output = new String(submitCreateTradeTsResult, StandardCharsets.UTF_8);
            log.info("deleteMyAsset completed : " + output);
        } catch (ContractException e) {
            throw new BlockchainException(e.getLocalizedMessage());
        }

    }


}
