package blockchainserver;

import com.app.blockchainserver.BlockchainServerApplication;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = BlockchainServerApplication.class)
@ActiveProfiles("test")
class BlockchainServerApplicationTests {

    @Test
    void contextLoads() {
        Assertions.assertTrue(true);
    }

}
