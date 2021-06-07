package com.app.blockchainserver.service.model;

import java.util.List;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class CowAssets {

    private List<CowAssetObj> list;

    public List<CowAssetObj> getList() {
        return list;
    }

    public void setList(List<CowAssetObj> list) {
        this.list = list;
    }
}