package com.app.blockchainserver.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CowAssetRequestDTO {
    @NotNull
    @NotEmpty
    @NotBlank
    private String cowId;
    private String assetType;
    private String race;
    private String age;
    private String food;
    private String bruteEnergy;
    private String conversionFactor;

    @NotNull
    @NotEmpty
    @NotBlank
    private String farmId;

    public String getCowId() {
        return cowId;
    }

    public void setCowId(String cowId) {
        this.cowId = cowId;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public String getBruteEnergy() {
        return bruteEnergy;
    }

    public void setBruteEnergy(String bruteEnergy) {
        this.bruteEnergy = bruteEnergy;
    }

    public String getConversionFactor() {
        return conversionFactor;
    }

    public void setConversionFactor(String conversionFactor) {
        this.conversionFactor = conversionFactor;
    }

    public String getFarmId() {
        return farmId;
    }

    public void setFarmId(String farmId) {
        this.farmId = farmId;
    }
}
