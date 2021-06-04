package com.app.blockchainserver.service;


import com.app.blockchainserver.dto.response.TradeAssetResponseDTO;
import com.app.blockchainserver.service.model.TradeAsset;
import com.app.blockchainserver.service.model.TradeAssets;

import java.util.List;

public interface IFabricService {
    TradeAssets readAllTradeTsAsset() throws Exception;

    TradeAsset readTradeAsset(String tradeId) throws Exception;

    void createTradeAsset(TradeAsset tradeAsset) throws Exception;

    void updateTradeAsset(UpdateType updateType,TradeAsset tradeAsset) throws Exception;

    void deleteTradeAsset(String tradeId) throws Exception;

    List<TradeAsset> queryAssetHistoryByKey(String tradeId) throws Exception;
}