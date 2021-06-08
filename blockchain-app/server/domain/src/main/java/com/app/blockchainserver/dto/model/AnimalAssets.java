package com.app.blockchainserver.dto.model;

import java.util.List;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class AnimalAssets {

    private List<AnimalAssetObj> list;

    public List<AnimalAssetObj> getList() {
        return list;
    }

    public void setList(List<AnimalAssetObj> list) {
        this.list = list;
    }
}