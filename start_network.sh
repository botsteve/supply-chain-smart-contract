export MICROFAB_CONFIG='{
    "port": 6969,
    "endorsing_organizations":[
        {
            "name": "Org1"
        },
        {
            "name": "Org2"
        },
        {
            "name": "Org3"
        }
    ],
    "channels":[
        {
            "name": "channel1",
            "endorsing_organizations":[
                "Org1",
                "Org2",
				"Org3"
            ]
        }
    ]
}';
docker run -e MICROFAB_CONFIG -dp 6969:6969 ibmcom/ibp-microfab