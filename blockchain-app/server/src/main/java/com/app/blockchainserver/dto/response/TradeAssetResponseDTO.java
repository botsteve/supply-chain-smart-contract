package com.app.blockchainserver.dto.response;

public class TradeAssetResponseDTO {

    private String tradeId;

    private String value;


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