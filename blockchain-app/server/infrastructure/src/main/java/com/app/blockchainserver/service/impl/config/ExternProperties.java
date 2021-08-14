package com.app.blockchainserver.service.impl.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.annotation.PostConstruct;

@Configuration
public class ExternProperties {

    @Value("${service.discovery.localhost}")
    private String serviceDiscoveryLocalhost;

    @PostConstruct
    public void initialiseProperties() {
        System.setProperty("org.hyperledger.fabric.sdk.service_discovery.as_localhost", serviceDiscoveryLocalhost);
    }

}
