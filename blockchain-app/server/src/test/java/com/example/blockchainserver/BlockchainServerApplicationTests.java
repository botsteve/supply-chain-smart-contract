package com.example.blockchainserver;

import com.app.blockchainserver.BlockchainServerApplication;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = BlockchainServerApplication.class)
class BlockchainServerApplicationTests {

    @Test
    void contextLoads() {
        Assertions.assertEquals(true, true);
    }

}
