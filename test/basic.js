var apod = require('../index');

var SAMPLE_RESPONSE = {
    "url": "http://apod.nasa.gov/apod/image/1508/LagoonTrifid_vdBerge_1080.jpg",
    "media_type": "image",
    "explanation": "These three bright nebulae are often featured in telescopic tours of the constellation Sagittarius and the crowded starfields of the central Milky Way. In fact, 18th century cosmic tourist Charles Messier cataloged two of them; M8, the large nebula left of center, and colorful M20 on the right. The third, NGC 6559, is above M8, separated from the larger nebula by a dark dust lane. All three are stellar nurseries about five thousand light-years or so distant. The expansive M8, over a hundred light-years across, is also known as the Lagoon Nebula. M20's popular moniker is the Trifid. Glowing hydrogen gas creates the dominant red color of the emission nebulae, with contrasting blue hues, most striking in the Trifid, due to dust reflected starlight. The colorful skyscape recorded with telescope and digital camera also includes one of Messier's open star clusters, M21, just above the Trifid.   Astrophysicists: Browse 1,000+ codes in the Astrophysics Source Code Library",
    "concepts": [ "Star", "Milky Way", "Nebula", "Astronomy", "Galaxy", "Interstellar medium", "Open cluster", "Crab Nebula"],
    "title": "A Sagittarius Triplet"
};

var SAMPLE_RESPONSE_2 = {
    "url": "http://apod.nasa.gov/apod/image/1508/BlueMoonHalo_Hang_960.jpg",
    "media_type": "image",
    "explanation": "Have you ever seen a halo around the Moon? Such 22 degree rings around the Moon -- caused by ice crystals falling in the Earth's atmosphere -- are somewhat rare.  OK, but have you ever seen a blue moon? Given the modern definition of blue moon -- the second full moon occurring in a calendar month -- these are also rare.  What is featured above might therefore be considered doubly rare -- a halo surrounding a blue moon. The featured image was taken late last month near Zhongshan Station in Antarctica.  Visible in the foreground are a power generating house and a snowmobile. What might seem to be stars in the background are actually illuminated snowflakes near the camera.",
    "concepts": ["Earth", "Ecliptic", "Lunar phase", "Moon", "Lunar eclipse", "Pluto", "Sun", "Atmosphere"],
    "title": "A Blue Moon Halo over Antarctica"
};

describe('apod', function() {

    before(function () {
        nock('https://api.nasa.gov')
            .get('/planetary/apod')
            .query({
                api_key: 'DEMO_KEY',
                concept_tags: true
            })
            .once()
            .reply(200, SAMPLE_RESPONSE);

        nock('https://api.nasa.gov')
            .get('/planetary/apod')
            .query({
                api_key: 'DEMO_KEY',
                concept_tags: true,
                date: '2000-12-17'
            })
            .once()
            .reply(200, SAMPLE_RESPONSE_2);
    });

    it('requests with no params', function () {
        return expect(apod()).to.eventually.deep.equal(SAMPLE_RESPONSE);
    });

    it('requests with date', function () {
        return expect(apod(new Date(2000, 11, 17))).to.eventually.deep.equal(SAMPLE_RESPONSE_2);
    });
});