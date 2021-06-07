package com.app.blockchainserver.service;


import com.app.blockchainserver.service.model.*;

import java.util.List;

public interface IFabricService {
    TradeAssets readAllTradeTsAsset(String assetType) throws Exception;

    CowAssets readAllCowAsset(String assetType) throws Exception;


    FarmAssets readAllFarmAsset(String assetType) throws Exception;


    TradeAsset readTradeAsset(String assetType, String tradeId) throws Exception;

    CowAsset readCowAsset(String assetType, String tradeId) throws Exception;

    FarmAsset readFarmAsset(String assetType, String tradeId) throws Exception;

    void createTradeAsset(TradeAsset tradeAsset) throws Exception;

    void createCowAsset(CowAsset cowAsset) throws Exception;

    void createFarmAsset(FarmAsset farmAsset) throws Exception;

    void updateTradeAsset(UpdateType updateType, TradeAsset tradeAsset) throws Exception;

    void deleteTradeAsset(String tradeId) throws Exception;

    List<TradeAsset> queryAssetHistoryByKey(String tradeId) throws Exception;
}