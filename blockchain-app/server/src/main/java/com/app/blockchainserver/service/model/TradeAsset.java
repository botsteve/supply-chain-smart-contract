package com.app.blockchainserver.service.model;

import com.app.blockchainserver.util.JsonUtil;
import com.fasterxml.jackson.annotation.JsonCreator;

public class TradeAsset {

    private String tradeId;
    private String value;

    public TradeAsset() {
        super();
    }

    public TradeAsset(String tradeId, String value) {
        this.tradeId = tradeId;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getTradeId() {
        return tradeId;
    }

    public void setTradeId(String tradeId) {
        this.tradeId = tradeId;
    }

    @JsonCreator
    public static TradeAsset create(String jsonString) {
        return (TradeAsset) JsonUtil.getJsonToObject(jsonString, TradeAsset.class);
    }
}