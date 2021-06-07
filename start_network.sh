export MICROFAB_CONFIG='{
    "port": 8080,
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
docker run -e MICROFAB_CONFIG -p 8080:8080 ibmcom/ibp-microfab