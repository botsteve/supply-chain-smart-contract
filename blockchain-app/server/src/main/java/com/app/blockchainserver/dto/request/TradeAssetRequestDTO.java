package com.app.blockchainserver.dto.request;

public class TradeAssetRequestDTO{

    private String tradeId;

    private String value;

    public TradeAssetRequestDTO() {
    }

    public TradeAssetRequestDTO(String tradeId, String value) {
        this.tradeId = tradeId;
        this.value = value;
    }

    public String getTradeId() {
        return tradeId;
    }

    public void setTradeId(String tradeId) {
        this.tradeId = tradeId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}