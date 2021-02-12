#!/bin/bash

echo What should the version be?
read VERSION

docker build -t lastnameswayne/crudapp:$VERSION .
docker push lastnameswayne/crudapp:$VERSION
ssh root@167.172.103.142 "docker pull lastnameswayne/crudapp:$VERSION
 && docker tag lastnameswayne/crudapp:$VERSION dokku/api:$VERSION && 
 dokku deploy api $VERSION"