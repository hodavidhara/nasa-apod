# nasa-apod
NASA's Astronomy Picture of the Day API

## Installation

```bash
$ npm install nodeify
```

## Usage

```javascript
var apod = require('nasa-apod');

apod(function(err, body) {
  console.log(body);
});
```