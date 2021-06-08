package com.app.blockchainserver.service.impl.config;

public class BlockchainException extends Exception {

    private String message;

    public BlockchainException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
