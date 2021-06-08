package com.app.blockchainserver.service.impl.config;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {Exception.class, RuntimeException.class})
    protected BlockchainException handleConflict(Exception ex) {
        return new BlockchainException(ex.getLocalizedMessage());
    }
}
