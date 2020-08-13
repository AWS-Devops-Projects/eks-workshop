'use strict';

const AWS = require('./node_modules/aws-sdk');
const config = require('./config');
const twitter_config = require('./twitter_reader_config.js.js');
const Twit = require('twit');
const util = require('util');
const logger = require('./util/logger');

function twitterStreamProducer() {
  const log = logger().getLogger('producer');
  const waitBetweenPutRecordsCallsInMilliseconds = config.waitBetweenPutRecordsCallsInMilliseconds;
  const T = new Twit(twitter_config.twitter)

  function _sendToFirehose() {
    const kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});
    const firehose = new AWS.Firehose({ apiVersion: '2015-08-04' });
    const dest_config = twitter_config.dest;

    const twitterParams = {
      track: twitter_config.topics,
      language: twitter_config.languages,
      filter_level: twitter_config.filter_level,
      stall_warnings: true
    }

    const stream = T.stream('statuses/filter', twitterParams);

    log.info('start streaming...')
    stream.on('tweet', function (tweet) {
      var tweetString = JSON.stringify(tweet)

      for (var i = 0; i < dest_config.length; i++) {
        var dest = dest_config[i];
        if (dest === 'stdout') {
          console.log(tweetString)
        } else if (dest.startsWith('kinesis:')) {
          const stream_name = dest.split(':')[1];
          const kinesisParams = {
            StreamName: stream_name,
            PartitionKey: tweet.id_str,
            Data: tweetString +'\n',
          };
          kinesis.putRecord(kinesisParams, function (err, data) {
            if (err) {
              log.error(err);
            }
          });
        } else if (dest.startsWith('firehose:')) {
          const stream_name = dest.split(':')[1];
          const firehoseParams = {
            DeliveryStreamName: stream_name,
            Record: {
              Data: tweetString + '\n'
            }
          };
          firehose.putRecord(firehoseParams, function (err, data) {
            if (err) {
              log.error(err);
            }
          });
        } else {
          log.warn('This destination is not supported. ' + dest);
        }
      }
    }
    );
  }

  return {
    run: function () {
      log.info(util.format('Configured wait between consecutive PutRecords call in milliseconds: %d',
        waitBetweenPutRecordsCallsInMilliseconds));
      _sendToFirehose();
    }
  }
}

module.exports = twitterStreamProducer;
