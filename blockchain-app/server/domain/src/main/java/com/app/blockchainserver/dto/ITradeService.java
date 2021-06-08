package com.app.blockchainserver.dto;


import com.app.blockchainserver.dto.request.BottleAssetRequestDTO;
import com.app.blockchainserver.dto.request.AnimalAssetRequestDTO;
import com.app.blockchainserver.dto.request.FarmAssetRequstDTO;
import com.app.blockchainserver.dto.response.BottleAssetResponseDTO;
import com.app.blockchainserver.dto.response.AnimalAssetResponseDTO;
import com.app.blockchainserver.dto.response.FarmAssetResponseDTO;

import java.util.List;

public interface ITradeService {
    List<BottleAssetResponseDTO> readAllTradeTsAsset(String assetType) throws Exception;

    List<AnimalAssetResponseDTO> readAllAnimalAssets(String assetType) throws Exception;

    List<FarmAssetResponseDTO> readAllFarmAsset(String assetType) throws Exception;

    BottleAssetResponseDTO readTradeAsset(String assetType, String tradeId) throws Exception;

    AnimalAssetResponseDTO readAnimalAsset(String assetType, String cowId) throws Exception;

    FarmAssetResponseDTO readFarmAsset(String assetType, String farmId) throws Exception;

    List<BottleAssetResponseDTO> queryAssetHistoryByKey(String tradeId) throws Exception;

    void createTradeAsset(BottleAssetRequestDTO tradeAsset) throws Exception;

    void createAnimalAsset(AnimalAssetRequestDTO tradeAsset) throws Exception;

    void createFarmAsset(FarmAssetRequstDTO tradeAsset) throws Exception;

    void wholesalerDistribute(BottleAssetRequestDTO tradeAsset) throws Exception;

    void retailerReceived(BottleAssetRequestDTO tradeAsset) throws Exception;

    void sellAsset(BottleAssetRequestDTO tradeAsset) throws Exception;

    void deleteTradeAsset(String tradeId) throws Exception;
}