package com.app.blockchainserver.service.model;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class TradeAssetObj{

    @JsonProperty("Key")
    private String Key;

    @JsonProperty("Record")
    private TradeAsset Record;

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public TradeAsset getRecord() {
        return Record;
    }

    public void setRecord(TradeAsset record) {
        Record = record;
    }
}