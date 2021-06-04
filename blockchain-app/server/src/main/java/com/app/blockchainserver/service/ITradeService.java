package com.app.blockchainserver.service;

import com.app.blockchainserver.dto.request.TradeAssetRequestDTO;
import com.app.blockchainserver.dto.response.TradeAssetResponseDTO;
import com.app.blockchainserver.dto.response.TradeAssetsResponseDTO;

import java.util.List;


public interface ITradeService {
    TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception;

    TradeAssetResponseDTO readTradeAsset(String tradeId) throws Exception;

    List<TradeAssetResponseDTO> queryAssetHistoryByKey(String tradeId) throws Exception;

    void createTradeAsset(TradeAssetRequestDTO tradeAsset) throws Exception;

    void wholesalerDistribute(TradeAssetRequestDTO tradeAsset) throws Exception;

    void retailerReceived(TradeAssetRequestDTO tradeAsset) throws Exception;

    void sellAsset(TradeAssetRequestDTO tradeAsset) throws Exception;

    void deleteTradeAsset(String tradeId) throws Exception;
}