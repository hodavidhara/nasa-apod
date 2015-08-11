var apod = require('../index');

describe('error handling', function() {

    before(function () {
        nock('https://api.nasa.gov')
            .get('/planetary/apod')
            .query({
                api_key: 'DEMO_KEY',
                concept_tags: true
            })
            .once()
            .reply(429);

        nock('https://api.nasa.gov')
            .get('/planetary/apod')
            .query({
                api_key: 'DEMO_KEY',
                concept_tags: true
            })
            .once()
            .reply(429);
    });

    it('maxed on rate limiting', function () {
        return expect(apod()).to.be.rejected;
    });
});