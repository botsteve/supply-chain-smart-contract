#!/bin/bash

#1st argument  - Certificate path
#2nd argument  - Priavte key path
#3rd argument  - Identity Path path
ARG1=${1:-D:\\GIT\\blockchain\\fabric-samples\\test-network\\organizations\\peerOrganizations\\org1.example.com\\users\\Admin@org1.example.com\\msp\\signcerts\\Admin@org1.example.com-cert.pem}
ARG2=${2:-D:\\GIT\\blockchain\\fabric-samples\\test-network\\organizations\\peerOrganizations\\org1.example.com\\users\\Admin@org1.example.com\\msp\\keystore\\priv_sk}
ARG3=${3:-D:\\GIT\\blockchain\\blockchain-app\\server\\exposition\\src\\main\\resources\\local_fabric_wallet\\Org1\\Org1_Admin_test_network.id}

ORG1_ADMIN_CER=$( cat  $ARG1)
#Add newline to EOL
ORG1_ADMIN_CER=$( sed -e 's/$/\\n/g' <<< $ORG1_ADMIN_CER )
#Remove carriege return and line feed chars
ORG1_ADMIN_CER=$( sed -e 's/\r//g' <<< $ORG1_ADMIN_CER )
ORG1_ADMIN_CER=$( sed ':a;N;$!ba;s/\n//g' <<< $ORG1_ADMIN_CER )

ORG1_ADMIN_PRIVATE_KEY=$( cat  $ARG2)
ORG1_ADMIN_PRIVATE_KEY=$( sed -e 's/$/\\n/g' <<< $ORG1_ADMIN_PRIVATE_KEY )
ORG1_ADMIN_PRIVATE_KEY=$( sed -e 's/\r//g' <<< $ORG1_ADMIN_PRIVATE_KEY )
ORG1_ADMIN_PRIVATE_KEY=$( sed ':a;N;$!ba;s/\n//g' <<< $ORG1_ADMIN_PRIVATE_KEY )

JSON_IDENTITY='{"credentials":{"certificate":"%s","privateKey":"%s"},"mspId":"Org1MSP","type":"X.509","version":1}'
printf "$JSON_IDENTITY" "$ORG1_ADMIN_CER" "$ORG1_ADMIN_PRIVATE_KEY"  > $ARG3