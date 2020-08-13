FROM node:12.16.1-alpine3.11 as builder

WORKDIR /home/node

COPY ["src/package.json", "./"]

RUN npm install

FROM node:12.16.1-alpine3.11

USER node

WORKDIR /home/node

COPY --from=builder /home/node/node_modules/ ./node_modules

COPY src/ ./

ENV TWITTER_TOPICS=AWS,EC2,S3,Workspaces,Covid \
    TWITTER_LANGUAGES=en,vi \
    TWITTER_FILTER_LEVEL=none \
    DESTINATION=stdout

CMD [ "node", "./twitter_stream_producer_app.js" ]