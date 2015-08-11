var apod = require('../index');

var SAMPLE_RESPONSE = JSON.stringify({
    "url": "http://apod.nasa.gov/apod/image/1508/LagoonTrifid_vdBerge_1080.jpg",
    "media_type": "image",
    "explanation": "These three bright nebulae are often featured in telescopic tours of the constellation Sagittarius and the crowded starfields of the central Milky Way. In fact, 18th century cosmic tourist Charles Messier cataloged two of them; M8, the large nebula left of center, and colorful M20 on the right. The third, NGC 6559, is above M8, separated from the larger nebula by a dark dust lane. All three are stellar nurseries about five thousand light-years or so distant. The expansive M8, over a hundred light-years across, is also known as the Lagoon Nebula. M20's popular moniker is the Trifid. Glowing hydrogen gas creates the dominant red color of the emission nebulae, with contrasting blue hues, most striking in the Trifid, due to dust reflected starlight. The colorful skyscape recorded with telescope and digital camera also includes one of Messier's open star clusters, M21, just above the Trifid.   Astrophysicists: Browse 1,000+ codes in the Astrophysics Source Code Library",
    "title": "A Sagittarius Triplet"
});

describe('apod.Client', function() {

    before(function () {
        nock('https://api.nasa.gov')
            .get('/planetary/apod')
            .query({
                api_key: 'test',
                concept_tags: false
            })
            .reply(200, SAMPLE_RESPONSE);
    });

    it('can be instantiated with no arguments', function () {
        var client = new apod.Client();
        expect(client).to.be.ok;
        expect(client).to.have.property('apiKey', 'DEMO_KEY');
        expect(client).to.have.property('conceptTags', true);
    });

    it('stores its arguments', function () {
        var client = new apod.Client({apiKey: 'test', conceptTags: false});
        expect(client).to.have.property('apiKey', 'test');
        expect(client).to.have.property('conceptTags', false);
    });

    it('can be instantiated multiple times', function () {
        var client = new apod.Client({apiKey: 'test', conceptTags: false});
        expect(client).to.have.property('apiKey', 'test');
        expect(client).to.have.property('conceptTags', false);

        var client2 = new apod.Client({apiKey: 'test2', conceptTags: true});
        expect(client2).to.have.property('apiKey', 'test2');
        expect(client2).to.have.property('conceptTags', true);

        // Reassert original properties to ensure we didn't mes up prototype values
        expect(client).to.have.property('apiKey', 'test');
        expect(client).to.have.property('conceptTags', false);
    });

    it('requests with configured params', function (done) {
        var client = new apod.Client({apiKey: 'test', conceptTags: false});
        expect(client).to.have.property('apiKey', 'test');
        expect(client).to.have.property('conceptTags', false);

        client(function (err, body) {
            expect(err).to.not.exist;
            expect(body).to.exist;
            expect(body).to.equal(SAMPLE_RESPONSE);
            done();
        })
    });
});