package com.app.blockchainserver.dto.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class FarmAssetObj {

    @JsonProperty("Key")
    private String Key;

    @JsonProperty("Record")
    private FarmAsset Record;

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public FarmAsset getRecord() {
        return Record;
    }

    public void setRecord(FarmAsset record) {
        Record = record;
    }
}