#!/bin/bash
set -m

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb \
& aws dynamodb create-table --table-name lunchbot-location-db --attribute-definitions AttributeName=placeId,AttributeType=S --key-schema AttributeName=placeId,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://localhost:8000 \
&& aws dynamodb batch-write-item --request-items file://locations_mock.json --endpoint-url http://localhost:8000 \
&& sleep 1 \
&& aws dynamodb create-table --table-name lunchbot-user-db --attribute-definitions AttributeName=userName,AttributeType=S --key-schema AttributeName=userName,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://localhost:8000 \
&& aws dynamodb batch-write-item --request-items file://users_mock.json --endpoint-url http://localhost:8000 
fg
