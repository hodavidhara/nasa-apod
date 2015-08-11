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