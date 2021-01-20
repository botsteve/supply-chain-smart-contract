package com.app.blockchainserver.service;

import com.app.blockchainserver.dto.request.TradeAssetRequestDTO;
import com.app.blockchainserver.dto.response.TradeAssetResponseDTO;
import com.app.blockchainserver.dto.response.TradeAssetsResponseDTO;
import com.app.blockchainserver.service.model.TradeAsset;
import org.hyperledger.fabric.gateway.Gateway;
import org.hyperledger.fabric.gateway.Network;


public interface ITradeService{
    TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception;
    TradeAssetResponseDTO readTradeAsset(String tradeId) throws Exception;
    void createTradeAsset(TradeAssetRequestDTO tradeAsset) throws  Exception;
    void updateTradeAsset(TradeAssetRequestDTO tradeAsset) throws Exception;
    void deleteTradeAsset(String tradeId) throws Exception;
}