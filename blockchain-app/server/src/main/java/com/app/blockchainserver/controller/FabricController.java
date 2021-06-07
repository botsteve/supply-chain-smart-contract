package com.app.blockchainserver.controller;

import com.app.blockchainserver.dto.request.BottleAssetRequestDTO;
import com.app.blockchainserver.dto.request.CowAssetRequestDTO;
import com.app.blockchainserver.dto.request.FarmAssetRequstDTO;
import com.app.blockchainserver.dto.response.BottleAssetResponseDTO;
import com.app.blockchainserver.dto.response.CowAssetResponseDTO;
import com.app.blockchainserver.dto.response.FarmAssetResponseDTO;
import com.app.blockchainserver.service.ITradeService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FabricController {

    private final ITradeService tradeService;

    public FabricController(ITradeService tradeService) {
        this.tradeService = tradeService;
    }

    @GetMapping(value = "/queryAllBottleAssets/{assetType}")
    public List<BottleAssetResponseDTO> readAllTradeTsAsset(@PathVariable String assetType) throws Exception {
        return tradeService.readAllTradeTsAsset(assetType);
    }

    @GetMapping(value = "/queryAllCowAssets/{assetType}")
    public List<CowAssetResponseDTO> readAllCowAssets(@PathVariable String assetType) throws Exception {
        return tradeService.readAllCowAssets(assetType);
    }

    @GetMapping(value = "/queryAllFarmAssets/{assetType}")
    public List<FarmAssetResponseDTO> readAllFarmAsset(@PathVariable String assetType) throws Exception {
        return tradeService.readAllFarmAsset(assetType);
    }

    @GetMapping(value = "/queryBottleAsset/{assetType}/{tradeId}")
    public BottleAssetResponseDTO readBottleAsset(@PathVariable String assetType, @PathVariable String tradeId) throws Exception {
        return tradeService.readTradeAsset(assetType, tradeId);
    }

    @GetMapping(value = "/queryCowAsset/{assetType}/{tradeId}")
    public CowAssetResponseDTO readCowAsset(@PathVariable String assetType, @PathVariable String tradeId) throws Exception {
        return tradeService.readCowAsset(assetType, tradeId);
    }

    @GetMapping(value = "/queryFarmAsset/{assetType}/{tradeId}")
    public FarmAssetResponseDTO readFarmAsset(@PathVariable String assetType, @PathVariable String tradeId) throws Exception {
        return tradeService.readFarmAsset(assetType, tradeId);
    }

    @GetMapping(value = "/queryAssetHistoryByKey/{tradeId}")
    public List<BottleAssetResponseDTO> queryAssetHistoryByKey(@PathVariable String tradeId) throws Exception {
        return tradeService.queryAssetHistoryByKey(tradeId);
    }

    @PostMapping(value = "/createBottleAsset/")
    public void createBottleAsset(@RequestBody BottleAssetRequestDTO bottleAssetRequestDTO) throws Exception {
        tradeService.createTradeAsset(bottleAssetRequestDTO);
    }

    @PostMapping(value = "/createCowAsset/")
    public void createCowAsset(@RequestBody CowAssetRequestDTO cowAssetRequestDTO) throws Exception {
        tradeService.createCowAsset(cowAssetRequestDTO);
    }

    @PostMapping(value = "/createFarmAsset/")
    public void createFarmAsset(@RequestBody FarmAssetRequstDTO farmAssetRequstDTO) throws Exception {
        tradeService.createFarmAsset(farmAssetRequstDTO);
    }

    @PostMapping(value = "/wholesalerDistribute/")
    public void wholesalerDistribute(@RequestBody BottleAssetRequestDTO bottleAssetRequestDTO) throws Exception {
        tradeService.wholesalerDistribute(bottleAssetRequestDTO);
    }

    @PostMapping(value = "/retailerReceived/")
    public void retailerReceived(@RequestBody BottleAssetRequestDTO bottleAssetRequestDTO) throws Exception {
        tradeService.retailerReceived(bottleAssetRequestDTO);
    }

    @PostMapping(value = "/sellAsset/")
    public void sellAsset(@RequestBody BottleAssetRequestDTO bottleAssetRequestDTO) throws Exception {
        tradeService.sellAsset(bottleAssetRequestDTO);
    }

    @PostMapping(value = "/deleteAsset/{tradeId}")
    public void updateAsset(@PathVariable String tradeId) throws Exception {
        tradeService.deleteTradeAsset(tradeId);
    }
}
