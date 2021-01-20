package com.app.blockchainserver.service.model;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.app.blockchainserver.util.JsonUtil;

public class TradeAsset {

    private String  tradeId;
    private String  value;

    public TradeAsset(){
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
    public static TradeAsset create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        return (TradeAsset) JsonUtil.getJsonToObject(jsonString, TradeAsset.class);
    }
}