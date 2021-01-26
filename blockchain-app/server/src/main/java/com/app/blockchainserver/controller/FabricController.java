package com.app.blockchainserver.controller;

import com.app.blockchainserver.dto.request.TradeAssetRequestDTO;
import com.app.blockchainserver.dto.response.TradeAssetResponseDTO;
import com.app.blockchainserver.dto.response.TradeAssetsResponseDTO;
import com.app.blockchainserver.service.ITradeService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

@Api
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FabricController {

    private final ITradeService tradeService;

    public FabricController(ITradeService tradeService) {
        this.tradeService = tradeService;
    }

    @GetMapping(value = "/queryAllAssets/")
    public TradeAssetsResponseDTO readAllTradeTsAsset() throws Exception {
        return tradeService.readAllTradeTsAsset();
    }

    @GetMapping(value = "/queryAsset/{tradeId}")
    public TradeAssetResponseDTO readAsset(@PathVariable String tradeId) throws Exception {
        return tradeService.readTradeAsset(tradeId);
    }

    @PostMapping(value = "/createAsset/")
    public void createAsset(@RequestBody TradeAssetRequestDTO tradeAssetRequestDTO) throws Exception {
        tradeService.createTradeAsset(tradeAssetRequestDTO);
    }

    @PostMapping(value = "/updateAsset/")
    public void updateAsset(@RequestBody TradeAssetRequestDTO tradeAssetRequestDTO) throws Exception {
        tradeService.updateTradeAsset(tradeAssetRequestDTO);
    }

    @PostMapping(value = "/deleteAsset/{tradeId}")
    public void updateAsset(@PathVariable String tradeId) throws Exception {
        tradeService.deleteTradeAsset(tradeId);
    }
}
