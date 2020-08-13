# Twitter Streaming Reader

## Configuring: `.env.sh`

* [ ] DOCKER_REGISTRY_PASSWORD
* [ ] TWITTER_ACCESS_TOKEN=        Twitter access_token
* [ ] TWITTER_ACCESS_TOKEN_SECRET= Twitter access_token_secret
* [ ] TWITTER_CONSUMER_KEY=        Twitter consumer_key
* [ ] TWITTER_CONSUMER_SECRET=     Twitter consumer_secret

* [ ] TWITTER_TOPICS=AWS,EC2,S3,Workspaces,Covid
* [ ] TWITTER_LANGUAGES=en,vi
* [ ] TWITTER_FILTER_LEVEL=none
* [ ] DESTINATION=kinesis:<your_kinesis_stream_name>,firehose:<your_firehose_stream_name>,stdout

> 🚀 `./deploy.sh`

## How to use this Docker Image

```bash
$ docker run \
    -e TWITTER_ACCESS_TOKEN=xxxxx \
    -e TWITTER_ACCESS_TOKEN_SECRET=xxxxx \
    -e TWITTER_CONSUMER_KEY=xxxxx \
    -e TWITTER_CONSUMER_SECRET=xxxxx \
    nnthanh101/twitter4u
```

### about Twitter Authentication

- `-e TWITTER_CONSUMER_KEY=...`
- `-e TWITTER_CONSUMER_SECRET=...`
- `-e TWITTER_ACCESS_TOKEN=...`
- `-e TWITTER_ACCESS_TOKEN_SECRET=...`

### Other options

- `-e TWITTER_TOPICS=AWS,EC2,S3,Workspaces,Covid`
- `-e TWITTER_LANGUAGES=en,vi`
- `-e TWITTER_FILTER_LEVEL=none`  # default: none
- `-e DESTINATION=kinesis:<your_kinesis_stream_name>,firehose:<your_firehose_stream_name>,stdout`  # default: stdout
