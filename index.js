var request = require('request');

var APOD_ENDPOINT = 'https://api.nasa.gov/planetary/apod';
var REQUEST = {
    url : APOD_ENDPOINT,
    qs : {
        api_key: 'DEMO_KEY',
        concept_tags: true
    }
};

module.exports = function (cb) {
    request(REQUEST, function (err, res, body) {
        cb(err, body);
    });
};