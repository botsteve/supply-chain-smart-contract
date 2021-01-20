package com.app.blockchainserver.dto.response;

import java.util.List;

public class TradeAssetsResponseDTO {

    private List<TradeAssetResponseDTO> tradeAssets;

    public List<TradeAssetResponseDTO> getTradeAssets() {
        return tradeAssets;
    }

    public void setTradeAssets(List<TradeAssetResponseDTO> tradeAssets) {
        this.tradeAssets = tradeAssets;
    }
}