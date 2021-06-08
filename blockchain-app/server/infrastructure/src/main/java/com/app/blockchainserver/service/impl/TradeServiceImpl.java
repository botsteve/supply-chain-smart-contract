package com.app.blockchainserver.service.impl;

import com.app.blockchainserver.service.config.BlockchainException;
import com.app.blockchainserver.dto.request.BottleAssetRequestDTO;
import com.app.blockchainserver.dto.request.CowAssetRequestDTO;
import com.app.blockchainserver.dto.request.FarmAssetRequstDTO;
import com.app.blockchainserver.dto.response.BottleAssetResponseDTO;
import com.app.blockchainserver.dto.response.CowAssetResponseDTO;
import com.app.blockchainserver.dto.response.FarmAssetResponseDTO;
import com.app.blockchainserver.service.IFabricService;
import com.app.blockchainserver.service.ITradeService;
import com.app.blockchainserver.service.UpdateType;
import com.app.blockchainserver.service.model.*;
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
    public List<BottleAssetResponseDTO> readAllTradeTsAsset(String assetType) throws Exception {

        List<BottleAssetResponseDTO> tradeAssets = new ArrayList<>();

        TradeAssets tradeList = fabricService.readAllTradeTsAsset(assetType);

        if (!Objects.isNull(tradeList.getList()) && !tradeList.getList().isEmpty()) {
            tradeList.getList().forEach(obj -> {
                if (obj != null && obj.getRecord() != null) {
                    BottleAssetResponseDTO responseDTO = new BottleAssetResponseDTO();
                    responseDTO.setAssetId(obj.getKey());
                    BeanUtils.copyProperties(obj.getRecord(), responseDTO);
                    tradeAssets.add(responseDTO);
                }
            });
        } else {
            throw new BlockchainException("No records found!");
        }


        return tradeAssets;
    }

    @Override
    public List<CowAssetResponseDTO> readAllCowAssets(String assetType) throws Exception {

        List<CowAssetResponseDTO> tradeAssets = new ArrayList<>();

        CowAssets tradeList = fabricService.readAllCowAsset(assetType);

        if (!Objects.isNull(tradeList.getList()) && !tradeList.getList().isEmpty()) {
            tradeList.getList().forEach(obj -> {
                if (obj != null && obj.getRecord() != null) {
                    CowAssetResponseDTO responseDTO = new CowAssetResponseDTO();
                    responseDTO.setCowId(obj.getKey());
                    BeanUtils.copyProperties(obj.getRecord(), responseDTO);
                    tradeAssets.add(responseDTO);
                }
            });
        } else {
            throw new BlockchainException("No records found!");
        }


        return tradeAssets;
    }

    @Override
    public List<FarmAssetResponseDTO> readAllFarmAsset(String assetType) throws Exception {

        List<FarmAssetResponseDTO> tradeAssets = new ArrayList<>();

        FarmAssets tradeList = fabricService.readAllFarmAsset(assetType);

        if (!Objects.isNull(tradeList.getList()) && !tradeList.getList().isEmpty()) {
            tradeList.getList().forEach(obj -> {
                if (obj != null && obj.getRecord() != null) {
                    FarmAssetResponseDTO responseDTO = new FarmAssetResponseDTO();
                    responseDTO.setFarmId(obj.getKey());
                    BeanUtils.copyProperties(obj.getRecord(), responseDTO);
                    tradeAssets.add(responseDTO);
                }
            });
        } else {
            throw new BlockchainException("No records found!");
        }


        return tradeAssets;
    }

    @Override
    public BottleAssetResponseDTO readTradeAsset(String assetType, String tradeId) throws Exception {

        BottleAssetResponseDTO tradeResponseDTO = new BottleAssetResponseDTO();
        TradeAsset obj = fabricService.readTradeAsset(assetType, tradeId);

        if (obj != null) {
            BeanUtils.copyProperties(obj, tradeResponseDTO);
        }

        return tradeResponseDTO;
    }

    @Override
    public CowAssetResponseDTO readCowAsset(String assetType, String cowId) throws Exception {
        CowAssetResponseDTO tradeResponseDTO = new CowAssetResponseDTO();
        CowAsset obj = fabricService.readCowAsset(assetType, cowId);

        if (obj != null) {
            BeanUtils.copyProperties(obj, tradeResponseDTO);
        }

        return tradeResponseDTO;
    }

    @Override
    public FarmAssetResponseDTO readFarmAsset(String assetType, String farmId) throws Exception {
        FarmAssetResponseDTO tradeResponseDTO = new FarmAssetResponseDTO();
        FarmAsset obj = fabricService.readFarmAsset(assetType, farmId);

        if (obj != null) {
            BeanUtils.copyProperties(obj, tradeResponseDTO);
        }

        return tradeResponseDTO;
    }


    @Override
    public List<BottleAssetResponseDTO> queryAssetHistoryByKey(String tradeId) throws Exception {
        List<TradeAsset> tradeAssets = fabricService.queryAssetHistoryByKey(tradeId);
        return !tradeAssets.isEmpty() ? tradeAssets.stream().map(e -> {
            BottleAssetResponseDTO asset = new BottleAssetResponseDTO();
            BeanUtils.copyProperties(e, asset);
            return asset;
        }).collect(Collectors.toList()) : new ArrayList<>();
    }


    @Override
    public void createTradeAsset(BottleAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset newAsset = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, newAsset);
        fabricService.createTradeAsset(newAsset);
    }

    @Override
    public void createCowAsset(CowAssetRequestDTO tradeAsset) throws Exception {
        CowAsset newAsset = new CowAsset();
        BeanUtils.copyProperties(tradeAsset, newAsset);
        fabricService.createCowAsset(newAsset);
    }

    @Override
    public void createFarmAsset(FarmAssetRequstDTO tradeAsset) throws Exception {
        FarmAsset newAsset = new FarmAsset();
        BeanUtils.copyProperties(tradeAsset, newAsset);
        fabricService.createFarmAsset(newAsset);
    }


    @Override
    public void wholesalerDistribute(BottleAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, obj);
        fabricService.updateTradeAsset(UpdateType.DISTRIBUTE, obj);
    }

    @Override
    public void retailerReceived(BottleAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, obj);
        fabricService.updateTradeAsset(UpdateType.RETAIL, obj);
    }

    @Override
    public void sellAsset(BottleAssetRequestDTO tradeAsset) throws Exception {
        TradeAsset obj = new TradeAsset();
        BeanUtils.copyProperties(tradeAsset, obj);
        fabricService.updateTradeAsset(UpdateType.CONSUMER, obj);
    }


    @Override
    public void deleteTradeAsset(String tradeId) throws Exception {
        fabricService.deleteTradeAsset(tradeId);
    }
}