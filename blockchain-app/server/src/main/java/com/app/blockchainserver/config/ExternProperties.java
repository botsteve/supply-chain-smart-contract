package com.app.blockchainserver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class ExternProperties {

    @Value("${service.discovery.localhost}")
    private String serviceDiscoveryLocalhost;

    @PostConstruct
    public void initialiseProperties(){
        System.setProperty("org.hyperledger.fabric.sdk.service_discovery.as_localhost",serviceDiscoveryLocalhost);
    }
}
