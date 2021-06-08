package com.app.blockchainserver.dto.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class AnimalAssetObj {

    @JsonProperty("Key")
    private String Key;

    @JsonProperty("Record")
    private AnimalAsset Record;

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public AnimalAsset getRecord() {
        return Record;
    }

    public void setRecord(AnimalAsset record) {
        Record = record;
    }
}