var apod = require('../index');

var OUT_OF_RANGE = {
    "message": "Admins have been notified.",
    "error": "Date must be between Jun 16, 1996 and Aug 11, 2015."
};

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
                concept_tags: true,
                date: '1996-01-01'
            })
            .once()
            .reply(200, OUT_OF_RANGE);
    });

    it('handles max rate limit reached as expected', function () {
        return expect(apod()).to.be.rejected;
    });

    it('handles 200 responses that are actually errors', function () {
        return expect(apod(new Date(1996,0 , 1))).to.be.rejected;
    });
});