FROM openjdk:8-jdk-alpine
ARG JAR_FILE=exposition/target/blockchain-server.jar
COPY ${JAR_FILE} app.jar
COPY exposition/src/main/resources/local_fabric_wallet exposition/src/main/resources/local_fabric_wallet
ENTRYPOINT ["java","-jar","/app.jar"]
