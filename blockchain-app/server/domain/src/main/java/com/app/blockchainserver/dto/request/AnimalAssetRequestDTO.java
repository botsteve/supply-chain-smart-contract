package com.app.blockchainserver.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class AnimalAssetRequestDTO {
    @NotNull
    @NotEmpty
    @NotBlank
    private String animalId;
    private String assetType;
    private String race;
    private int age;
    private String food;
    private int weight;
    private String animalCategory;

    private String grossEnergyConsumption;
    private String foodDigestibility;
    private String urinaryEnergy;
    private String treatedStableTrashFactor;
    private String trashManagementSystem;
    private String annualNitrogenOxidesExcretionFactor;
    private String gasFactorMS;

    @NotNull
    @NotEmpty
    @NotBlank
    private String farmId;


    public String getAnimalId() {
        return animalId;
    }

    public void setAnimalId(String animalId) {
        this.animalId = animalId;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getAnimalCategory() {
        return animalCategory;
    }

    public void setAnimalCategory(String animalCategory) {
        this.animalCategory = animalCategory;
    }

    public String getGrossEnergyConsumption() {
        return grossEnergyConsumption;
    }

    public void setGrossEnergyConsumption(String grossEnergyConsumption) {
        this.grossEnergyConsumption = grossEnergyConsumption;
    }

    public String getFoodDigestibility() {
        return foodDigestibility;
    }

    public void setFoodDigestibility(String foodDigestibility) {
        this.foodDigestibility = foodDigestibility;
    }

    public String getUrinaryEnergy() {
        return urinaryEnergy;
    }

    public void setUrinaryEnergy(String urinaryEnergy) {
        this.urinaryEnergy = urinaryEnergy;
    }

    public String getTreatedStableTrashFactor() {
        return treatedStableTrashFactor;
    }

    public void setTreatedStableTrashFactor(String treatedStableTrashFactor) {
        this.treatedStableTrashFactor = treatedStableTrashFactor;
    }

    public String getTrashManagementSystem() {
        return trashManagementSystem;
    }

    public void setTrashManagementSystem(String trashManagementSystem) {
        this.trashManagementSystem = trashManagementSystem;
    }

    public String getAnnualNitrogenOxidesExcretionFactor() {
        return annualNitrogenOxidesExcretionFactor;
    }

    public void setAnnualNitrogenOxidesExcretionFactor(String annualNitrogenOxidesExcretionFactor) {
        this.annualNitrogenOxidesExcretionFactor = annualNitrogenOxidesExcretionFactor;
    }

    public String getGasFactorMS() {
        return gasFactorMS;
    }

    public void setGasFactorMS(String gasFactorMS) {
        this.gasFactorMS = gasFactorMS;
    }

    public String getFarmId() {
        return farmId;
    }

    public void setFarmId(String farmId) {
        this.farmId = farmId;
    }
}

