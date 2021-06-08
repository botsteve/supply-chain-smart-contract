package com.app.blockchainserver.dto;


import com.app.blockchainserver.dto.model.*;

import java.util.List;

public interface IFabricService {
    TradeAssets readAllTradeTsAsset(String assetType) throws Exception;

    AnimalAssets readAllAnimalAsset(String assetType) throws Exception;


    FarmAssets readAllFarmAsset(String assetType) throws Exception;


    TradeAsset readTradeAsset(String assetType, String tradeId) throws Exception;

    AnimalAsset readAnimalAsset(String assetType, String tradeId) throws Exception;

    FarmAsset readFarmAsset(String assetType, String tradeId) throws Exception;

    void createTradeAsset(TradeAsset tradeAsset) throws Exception;

    void createAnimalAsset(AnimalAsset animalAsset) throws Exception;

    void createFarmAsset(FarmAsset farmAsset) throws Exception;

    void updateTradeAsset(UpdateType updateType, TradeAsset tradeAsset) throws Exception;

    void deleteTradeAsset(String tradeId) throws Exception;

    List<TradeAsset> queryAssetHistoryByKey(String tradeId) throws Exception;
}