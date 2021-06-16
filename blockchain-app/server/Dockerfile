FROM openjdk:8-jdk-alpine
ARG JAR_FILE=exposition/target/blockchain-server.jar
COPY ${JAR_FILE} app.jar
COPY local_fabric_wallet local_fabric-wallet
ENTRYPOINT ["java","-jar","/app.jar"]
