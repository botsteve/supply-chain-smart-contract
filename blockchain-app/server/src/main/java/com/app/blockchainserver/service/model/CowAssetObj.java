package com.app.blockchainserver.service.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class CowAssetObj {

    @JsonProperty("Key")
    private String Key;

    @JsonProperty("Record")
    private CowAsset Record;

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public CowAsset getRecord() {
        return Record;
    }

    public void setRecord(CowAsset record) {
        Record = record;
    }
}