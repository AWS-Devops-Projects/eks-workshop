# export AWS_ACCOUNT_ID=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r .accountId)
# export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)
# export AWS_DEFAULT_REGION=ap-southeast-2
# export AWS_ACCESS_KEY_ID=<aws-access-key-id>
# export AWS_SECRET_ACCESS_KEY=<aws-secret-access-key>
# export AWS_SESSION_TOKEN="<token>" #if using AWS SSO

# export DOCKER_REGISTRY_EMAIL=<your-docker-registry-email>
# export DOCKER_REGISTRY_USERNAME=<your-docker-registry-username>
# export DOCKER_REGISTRY_NAMESPACE=<your-docker-registry-namespace>
# export DOCKER_REGISTRY_PASSWORD=<your-docker-registry-password>
export DOCKER_REGISTRY_EMAIL=nnthanh101@gmail.com
export DOCKER_REGISTRY_USERNAME=nnthanh101
export DOCKER_REGISTRY_NAMESPACE=nnthanh101
export DOCKER_REGISTRY_PASSWORD=XXXX

export DOCKER_REPOSITORY=twitter4u

export TWITTER_CONSUMER_KEY=<consumer_key>
export TWITTER_CONSUMER_SECRET=<consumer_secret>
export TWITTER_ACCESS_TOKEN=<access_token>
export TWITTER_ACCESS_TOKEN_SECRET=<access_token_secret>
