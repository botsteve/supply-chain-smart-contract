package com.app.blockchainserver.service.impl;

import com.app.blockchainserver.config.BlockchainException;
import com.app.blockchainserver.dto.request.TradeAssetRequestDTO;
import com.app.blockchainserver.dto.response.TradeAssetResponseDTO;
import com.app.blockchainserver.dto.response.TradeAssetsResponseDTO;
import com.app.blockchainserver.service.IFabricService;
import com.app.blockchainserver.service.ITradeService;
import com.app.blockchainserver.service.UpdateType;
import com.app.blockchainserver.service.model.TradeAsset;
import com.app.blockchainserver.service.model.TradeAssetObj;
import com.app.blockchainserver.service.model.TradeAssets;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class TradeServiceImpl implements ITradeService {

    private final IFabricService fabricService;

    public TradeServiceImpl(IFabricService fabricService) {
        this.fabricService = fabricService;
    }

    @Override
    public TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception {

        TradeAssetsResponseDTO tradeResponseDTO = new TradeAssetsResponseDTO();
        List<TradeAssetResponseDTO> tradeAssets = new ArrayList<>();

        TradeAssets tradeList = fabricService.readAllTradeTsAsset();

        if (!Objects.isNull(tradeList.getList()) && !tradeList.getList().isEmpty()) {
            tradeList.getList().forEach(obj -> {
                if (obj != null && obj.getRecord() != null) {
                    TradeAssetResponseDTO responseDTO = new TradeAssetResponseDTO();
                    responseDTO.setAssetId(obj.getKey());
                    BeanUtils.copyProperties(obj.getRecord(), responseDTO);
                    tradeAssets.add(responseDTO);
                }
            });
        } else {
            throw new BlockchainException("No records found!");
        }

        tradeResponseDTO.setTradeAssets(tradeAssets);

        return tradeResponseDTO;
    }

    @Override
    public TradeAssetResponseDTO readTradeAsset(String tradeId) throws Exception {

        TradeAssetResponseDTO tradeResponseDTO = new TradeAssetResponseDTO();
        TradeAsset obj = fabricService.readTradeAsset(tradeId);

        if (obj != null) {
            BeanUtils.copyProperties(obj, tradeResponseDTO);
        }

        return tradeResponseDTO;
    }

    @Override
    public List<TradeAssetResponseDTO> queryAssetHistoryByKey(String tradeId) throws Exception {
        List<TradeAsset> tradeAssets = fabricService.queryAssetHistoryByKey(tradeId);
        return !tradeAssets.isEmpty() ? tradeAssets.stream().map(e -> {
            TradeAssetResponseDTO asset = new TradeAssetResponseDTO();
            BeanUtils.copyProperties(e, asset);
            return asset;
        }).collect(Collectors.toList()) : new ArrayList<>();
    }


    @Override
    public void createTradeAsset(TradeAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset newAsset = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, newAsset);
        fabricService.createTradeAsset(newAsset);
    }

    @Override
    public void wholesalerDistribute(TradeAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, obj);
        fabricService.updateTradeAsset(UpdateType.DISTRIBUTE, obj);
    }

    @Override
    public void retailerReceived(TradeAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, obj);
        fabricService.updateTradeAsset(UpdateType.RETAIL, obj);
    }

    @Override
    public void sellAsset(TradeAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, obj);
        fabricService.updateTradeAsset(UpdateType.CONSUMER, obj);
    }


    @Override
    public void deleteTradeAsset(String tradeId) throws Exception {
        fabricService.deleteTradeAsset(tradeId);
    }
}