package com.app.blockchainserver.service.impl;

import com.app.blockchainserver.dto.request.TradeAssetRequestDTO;
import com.app.blockchainserver.dto.response.TradeAssetResponseDTO;
import com.app.blockchainserver.dto.response.TradeAssetsResponseDTO;
import com.app.blockchainserver.service.IFabricService;
import com.app.blockchainserver.service.ITradeService;
import com.app.blockchainserver.service.model.TradeAsset;
import com.app.blockchainserver.service.model.TradeAssetObj;
import com.app.blockchainserver.service.model.TradeAssets;
import org.hyperledger.fabric.gateway.Gateway;
import org.hyperledger.fabric.gateway.Network;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TradeServiceImpl implements ITradeService {

    private long tradeId = 1;

    @Autowired
    private IFabricService fabricService;


    @Override
    public TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception {

        TradeAssetsResponseDTO tradeResponseDTO = new TradeAssetsResponseDTO();
        List<TradeAssetResponseDTO> tradeAssets = new ArrayList<>();

        TradeAssets tradeList = fabricService.readAllTradeTsAsset();

        for (TradeAssetObj obj : tradeList.getList()) {

            if (obj != null && obj.getRecord() != null) {
                TradeAssetResponseDTO responseDTO = new TradeAssetResponseDTO();
                responseDTO.setTradeId(obj.getKey());
                responseDTO.setValue(obj.getRecord().getValue());


                tradeAssets.add(responseDTO);
            }
        }

        tradeResponseDTO.setTradeAssets(tradeAssets);

        return tradeResponseDTO;
    }

    @Override
    public TradeAssetResponseDTO readTradeAsset(String tradeId) throws Exception {

        TradeAssetResponseDTO tradeResponseDTO = new TradeAssetResponseDTO();
        TradeAsset obj = fabricService.readTradeAsset(tradeId);

        if (obj != null && obj.getValue() != null) {
            tradeResponseDTO.setTradeId(obj.getTradeId());
            tradeResponseDTO.setValue(obj.getValue());
        }

        return tradeResponseDTO;
    }

    @Override
    public void createTradeAsset(TradeAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset(tradeAsset.getTradeId(),tradeAsset.getValue());
        fabricService.createTradeAsset(obj);
    }

    @Override
    public void updateTradeAsset(TradeAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset(tradeAsset.getTradeId(),tradeAsset.getValue());
        fabricService.updateTradeAsset(obj);
    }

    @Override
    public void deleteTradeAsset(String tradeId) throws Exception {
        fabricService.deleteTradeAsset(tradeId);
    }
}