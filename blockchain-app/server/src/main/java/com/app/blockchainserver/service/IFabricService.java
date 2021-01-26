package com.app.blockchainserver.service;


import com.app.blockchainserver.service.model.TradeAsset;
import com.app.blockchainserver.service.model.TradeAssets;

public interface IFabricService {
    TradeAssets readAllTradeTsAsset() throws Exception;

    TradeAsset readTradeAsset(String tradeId) throws Exception;

    void createTradeAsset(TradeAsset tradeAsset) throws Exception;

    void updateTradeAsset(TradeAsset tradeAsset) throws Exception;

    void deleteTradeAsset(String tradeId) throws Exception;
}