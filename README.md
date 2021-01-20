# Blockchain project

## [Blockchain app / client](https://github.com/botsteve/blockchain/tree/main/blockchain-app/client)
  This folder contains the **Angular** web application.
  
## [Blockchain app / server](https://github.com/botsteve/blockchain/tree/main/blockchain-app/server)
  This folder contains the **Spring Boot** application which runs an embedded **Tomcat server** and connects to the **HyperLedger Fabric** network using the **fabric-gateway-java** dependency.
  
## [Blockchain smart-contract](https://github.com/botsteve/blockchain/tree/main/blockchain-contract)
  This folder contains the **smart contract** developed in **NodeJs** using dependencies like **fabric network** that are compiled, packaged and loaded onto a **fabric environment**. It takes advantage of **IBM Blochain Platform** VScode extension to load and manage the smart-contract onto the __local fabric network__.

## [Blockchain Wallet Migration](https://github.com/botsteve/blockchain/tree/main/WalletMigration)
  This folder is mainly used for migrating the wallet from the 1.4 Version to 2.x+ because the server application uses th latest **fabric-java-sdk** dependency which uses a new, faster way to configure a wallet to use withing the network.
