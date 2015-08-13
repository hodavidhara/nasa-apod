var request = require('request-promise');

var APOD_ENDPOINT = 'https://api.nasa.gov/planetary/apod';
var DEFAULT_PARAMS = {
    api_key: 'DEMO_KEY',
    concept_tags: true
};

/**
 *
 * @param date
 */
var apod = function (date) {
    return _request(DEFAULT_PARAMS.api_key, DEFAULT_PARAMS.concept_tags, date);
};

/**
 *
 * @param args
 * @returns {Function}
 * @constructor
 */
apod.Client = function (args) {
    var client = function(date) {
        return _request(that.apiKey, that.conceptTags, date);
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

_request = function (apiKey, conceptTags, date) {
    var qs = {
        api_key: apiKey,
        concept_tags: conceptTags
    };

    if (date) {
        var isoDate = date.toISOString();
        qs.date = isoDate.substring(0, isoDate.indexOf('T'));
    }

    return request({url: APOD_ENDPOINT, qs: qs}).then(function (body) {

        // Handle 200 responses that are actually errors.
        var parsed = JSON.parse(body);
        if (parsed.error) {
            throw new Error(parsed.error);
        } else {
            return parsed;
        }
    });
};

module.exports = apod;