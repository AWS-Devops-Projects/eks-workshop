#!/bin/bash
set -e

source .env.sh

started_time=$(date '+%d/%m/%Y %H:%M:%S')
echo
echo "#########################################################"
echo "Docker build & push >> starting at ${started_time}"
echo "#########################################################"
echo
docker login --username ${DOCKER_REGISTRY_USERNAME} --password ${DOCKER_REGISTRY_PASSWORD} 
docker build -t ${DOCKER_REPOSITORY} .
docker tag ${DOCKER_REPOSITORY} ${DOCKER_REGISTRY_NAMESPACE}/${DOCKER_REPOSITORY}
docker push ${DOCKER_REGISTRY_NAMESPACE}/${DOCKER_REPOSITORY}
ended_time=$(date '+%d/%m/%Y %H:%M:%S')
echo
echo "#########################################################"
echo "Docker build & push >> finished at ${ended_time}"
echo "#########################################################"
echo

docker run -it --rm \
       -e TWITTER_CONSUMER_KEY=${TWITTER_CONSUMER_KEY} \
       -e TWITTER_CONSUMER_SECRET=${TWITTER_CONSUMER_SECRET} \
       -e TWITTER_ACCESS_TOKEN=${TWITTER_ACCESS_TOKEN} \
       -e TWITTER_ACCESS_TOKEN_SECRET=${TWITTER_ACCESS_TOKEN_SECRET} \
       -e TWITTER_TOPICS=AWS,EC2,S3,Workspaces,Covid \
       -e TWITTER_LANGUAGES=en,vi \
       -e TWITTER_FILTER_LEVEL=none \
       nnthanh101/${DOCKER_REPOSITORY}

## TODO
# -e DESTINATION=kinesis:<your_kinesis_stream_name>,firehose:<your_firehose_stream_name>,stdout \