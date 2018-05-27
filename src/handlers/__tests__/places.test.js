const mockedAxios = require('axios');
const { placesSearchById, placesSearch } = require('../places');
const { placesFormatter } = require('../formatter.js');
const config = require('../../../config/main.js');

const placesApiSearchResponse = require('./data/placesApiSearchResponse.json');
const placesApiSearchByIdResponse = require('./data/placesApiSearchByIdResponse.json');

describe('Place search handler', () => {
  test('correct response on valid request', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: placesApiSearchResponse
    }));

    const expected = placesApiSearchResponse.results.map(placesFormatter);
    let actual;
    await placesSearch(
      { params: { query: 'amidakolgrill' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.api.placesSearch,
      { params: { query: 'amidakolgrill' } }
    );
  });

  test('status code 500 when API response status not OK', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: { results: [], status: 'REQUEST_DENIED' }
    }));

    let actual;
    await placesSearch(
      { params: { query: 'amidakolgrill' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toBe(500);
  });

  test('status code 500 when API request failed', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.reject('something broken'));

    let actual;
    await placesSearch(
      { params: { query: 'amidakolgrill' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toBe(500);
  });
});

describe('Place search by id handler', () => {
  test('correct response on valid request', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: placesApiSearchByIdResponse
    }));

    const expected = placesFormatter(placesApiSearchByIdResponse.result);
    let actual;
    await placesSearchById(
      { params: { placeId: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      config.api.placesDetail,
      { params: { placeid: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' } }
    );
  });

  test('status code 500 when API response status not OK', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: { result: [], status: 'REQUEST_DENIED' }
    }));

    let actual;
    await placesSearchById(
      { params: { placeId: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toBe(500);
  });

  test('status code 500 when API request failed', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.reject('something broken'));

    let actual;
    await placesSearchById(
      { params: { placeId: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toBe(500);
  });
});