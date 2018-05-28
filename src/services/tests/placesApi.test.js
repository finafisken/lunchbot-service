const mockedAxios = require('axios');
const { placesSearchById, placesSearch } = require('../placesApi.js');
const { placesFormatter } = require('../../../utils/formatter.js');
const config = require('../../../config/main.js');

const placesApiSearchResponse = require('./data/placesApiSearchResponse.json');
const placesApiSearchByIdResponse = require('./data/placesApiSearchByIdResponse.json');

describe('Places API', () => {
  test('correct response on valid request', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: placesApiSearchResponse
      })
    );

    const expected = placesApiSearchResponse.results.map(placesFormatter);
    const actual = await placesSearch('amidakolgrill');

    expect(actual).toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith(config.api.placesSearch, {
      params: { query: 'amidakolgrill' }
    });
  });

  test('reject with status reason when not OK', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { status: 'REQUEST_DENIED' }
      })
    );

    try {
      await placesSearch('amidakolgrill');
    } catch (e) {
      expect(e).toBe('REQUEST_DENIED');
    }
  });

  test('reject with fallback when no status provided', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: 'broken response'
      })
    );

    try {
      await placesSearch('amidakolgrill');
    } catch (e) {
      expect(e).toBe('Bad response from API');
    }
  });
});

describe('Place search by id handler', () => {
  test('correct response on valid request', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: placesApiSearchByIdResponse
      })
    );

    const expected = placesFormatter(placesApiSearchByIdResponse.result);
    const actual = await placesSearchById('ChIJU_anGPp3X0YRTIbCK2z6-bA');

    expect(actual).toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith(config.api.placesDetail, {
      params: { placeid: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' }
    });
  });

  test('reject with status reason when not OK', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { status: 'REQUEST_DENIED' }
      })
    );

    try {
      await placesSearchById('ChIJU_anGPp3X0YRTIbCK2z6-bA');
    } catch (e) {
      expect(e).toBe('REQUEST_DENIED');
    }
  });

  test('reject with fallback when no status provided', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: 'broken response'
      })
    );

    try {
      await placesSearchById('ChIJU_anGPp3X0YRTIbCK2z6-bA');
    } catch (e) {
      expect(e).toBe('Bad response from API');
    }
  });
});
