# nasa-apod
NASA's Astronomy Picture of the Day API

[![Build Status](https://travis-ci.org/hodavidhara/nasa-apod.svg?branch=develop)](https://travis-ci.org/hodavidhara/nasa-apod)

## Installation

```bash
$ npm install nasa-apod
```

## Usage
nasa-apod uses Promises, consider using something like [nodeify](https://www.npmjs.com/package/nodeify)
if your prefer callbacks.

### with defaults
```javascript
var apod = require('nasa-apod');

// Get todays apod data
apod().then(function(data) {
    console.log(body);
});

// Get apod data for a specific date
apod(new Date(2015, 01, 01)).then(function(data) {
    console.log(body);
});
```

### with configuration
```javascript
var apod = require('nasa-apod');

var client = new apod.Client({
    apiKey: 'API_KEY',
    conceptTags: true
});

// Get todays apod data
client().then(function(body) {
  console.log(body);
});

// Get apod data for a specific date
client(new Date(2015, 01, 01)).then(function(body) {
  console.log(body);
});
```

## Response Format
A Successful response will look like the following.


```json
{
  "url": "http://apod.nasa.gov/apod/image/9701/auroracircle_dh_big.jpg",
  "media_type": "image",
  "explanation": "Aurora can make spectacular sights. This particular aurora\r was photographed hovering over the town of Circle, Alaska.  Although Aurora\r might first appear to be moonlit clouds, they only add light to the sky, and hence can not block\r background stars from view. Called \"northern lights\"\r in the northern hemisphere of the Earth,\r aurora are caused by charged particles streaming from the Sun\r entering the Earth's atmosphere. If viewed from space, aurora glow in X-ray light\r as well as in the visible! Several WWW sites can tell you if aurora are predicted to be visible in your area.",
  "concepts": ["Sun", "Climate", "Equator", "Solstice", "Atmosphere", "Earth", "Light", "Pacific Ocean"],
  "title": "Aurora Over Circle, Alaska"
}
```

Note that there are only apods beginning June 16, 1996, requests for apods before that will be rejected.

## Rate Limits
By default nasa-apod will use the `DEMO_KEY` api key which will limit you to 30
requests per hour and 50 requests per day. You can register for your own API key
[here](https://api.nasa.gov/index.html#apply-for-an-api-key), which will bump your
limit up to 1000 requests per hour, and no daily limit. [See more on NASA's rate
limiting.](https://api.nasa.gov/api.html#web-service-rate-limits)