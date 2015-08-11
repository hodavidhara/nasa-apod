# nasa-apod
NASA's Astronomy Picture of the Day API

[![Build Status](https://travis-ci.org/hodavidhara/nasa-apod.svg?branch=develop)](https://travis-ci.org/hodavidhara/nasa-apod)

## Installation

```bash
$ npm install nasa-apod
```

## Usage
### with defaults
```javascript
var apod = require('nasa-apod');

apod(function(err, body) {
  console.log(body);
});
```

### with configuration
```javascript
var apod = require('nasa-apod');

var client = new apod.Client({
    apiKey: '',
    conceptTags: true
});

client(function(err, body) {
  console.log(body);
});
```

## Rate Limits
By default nasa-apod will use the `DEMO_KEY` api key which will limit you to 30
requests per hour and 50 requests per day. You can register for your own API key
[here](https://api.nasa.gov/index.html#apply-for-an-api-key), which will bump your
limit up to 1000 requests per hour, and no daily limit. [See more on NASA's rate
limiting.](https://api.nasa.gov/api.html#web-service-rate-limits)