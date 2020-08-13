const twitter_config = module.exports = {
    twitter: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    topics: process.env.TWITTER_TOPICS.split(','),
    languages: process.env.TWITTER_LANGUAGES.split(','),
    filter_level: process.env.TWITTER_FILTER_LEVEL,
    dest: process.env.DESTINATION.split(',')
}
