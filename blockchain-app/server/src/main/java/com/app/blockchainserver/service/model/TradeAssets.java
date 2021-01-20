package com.app.blockchainserver.service.model;

import java.util.List;

/**
 * {"Key":"001","Record":{"value":"The Hay Wain"}}
 */
public class TradeAssets{

    private List<TradeAssetObj> list;

    public List<TradeAssetObj> getList() {
        return list;
    }

    public void setList(List<TradeAssetObj> list) {
        this.list = list;
    }
}