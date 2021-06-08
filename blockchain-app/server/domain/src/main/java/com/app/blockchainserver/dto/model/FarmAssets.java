package com.app.blockchainserver.dto.model;

import java.util.List;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class FarmAssets {

    private List<FarmAssetObj> list;

    public List<FarmAssetObj> getList() {
        return list;
    }

    public void setList(List<FarmAssetObj> list) {
        this.list = list;
    }
}