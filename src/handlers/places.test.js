const axios = require('axios');
const AxiosMock = require('axios-mock-adapter');
const { placesSearchById, placesSearch } = require('./places');
const { placesFormatter } = require('./formatter.js');
const config = require('../../config/main.js');

const placesApiSearchResponse = require('../../test/placesApiSearchResponse.json');
const mock = new AxiosMock(axios);

describe('Place search handler', () => {
  // reset response mock between tests
  afterEach(() => mock.reset());

  test('it should be true', async () => {
    mock
      .onGet(config.api.placesSearch, {
        params: {
          query: 'amidakolgrill',
          key: process.env.GOOGLE_API_KEY
        }
      })
      .reply(200, placesApiSearchResponse);

    const expected = placesApiSearchResponse.results.map(placesFormatter);
    let actual;
    await placesSearch(
      { params: { query: 'amidakolgrill' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toBe(expected);
  });
});

mock.restore(); // restore axios
