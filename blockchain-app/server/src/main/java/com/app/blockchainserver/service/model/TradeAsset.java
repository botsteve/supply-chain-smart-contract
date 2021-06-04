package com.app.blockchainserver.service.model;

import com.app.blockchainserver.util.JsonUtil;
import com.fasterxml.jackson.annotation.JsonCreator;

public class TradeAsset {

    private String assetId;
    private String manufacturer;
    private String assetType;
    private String ownerName;
    private String previousOwnerType;
    private String currentOwnerType;
    private String createDateTime;
    private String lastUpdated;


    public TradeAsset() {
        super();
    }

    public TradeAsset(String assetId, String manufacturer) {
        this.assetId = assetId;
        this.manufacturer = manufacturer;
    }

    public TradeAsset(String assetId, String manufacturer, String assetType, String ownerName, String previousOwnerType, String currentOwnerType, String createDateTime, String lastUpdated) {
        this.assetId = assetId;
        this.manufacturer = manufacturer;
        this.assetType = assetType;
        this.ownerName = ownerName;
        this.previousOwnerType = previousOwnerType;
        this.currentOwnerType = currentOwnerType;
        this.createDateTime = createDateTime;
        this.lastUpdated = lastUpdated;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getPreviousOwnerType() {
        return previousOwnerType;
    }

    public void setPreviousOwnerType(String previousOwnerType) {
        this.previousOwnerType = previousOwnerType;
    }

    public String getCurrentOwnerType() {
        return currentOwnerType;
    }

    public void setCurrentOwnerType(String currentOwnerType) {
        this.currentOwnerType = currentOwnerType;
    }

    public String getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(String createDateTime) {
        this.createDateTime = createDateTime;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    @JsonCreator
    public static TradeAsset create(String jsonString) {
        return (TradeAsset) JsonUtil.getJsonToObject(jsonString, TradeAsset.class);
    }
}