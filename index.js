var request = require('request');

var APOD_ENDPOINT = 'https://api.nasa.gov/planetary/apod';
var DEFAULT_PARAMS = {
    api_key: 'DEMO_KEY',
    concept_tags: true
};

var apod = function (cb) {
    _request(DEFAULT_PARAMS.api_key, DEFAULT_PARAMS.concept_tags, cb);
};

apod.Client = function (args) {
    var client = function(cb) {
        _request(that.apiKey, that.conceptTags, cb);
    };

    args = args || {};
    client.apiKey = args.apiKey || DEFAULT_PARAMS.api_key;
    client.conceptTags = args.conceptTags != undefined && args.conceptTags != null ?
        args.conceptTags :
        DEFAULT_PARAMS.concept_tags;

    client.__proto__ = this.__proto__;
    var that = client;
    return client;
};

_request = function (apiKey, conceptTags, cb) {
    request({
        url: APOD_ENDPOINT,
        qs: {
            api_key: apiKey,
            concept_tags: conceptTags
        }
    }, function (err, res, body) {
        cb(err, body);
    });
};

module.exports = apod;