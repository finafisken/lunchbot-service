const mockedAxios = require('axios');
const { distanceById } = require('../distanceApi.js');
const { distanceFormatter } = require('../../../utils/formatter.js');
const config = require('../../../config/main.js');

const distanceApiResponse = require('./data/distanceApiResponse.json');

describe('Distance API', () => {
  test('correct response on valid request', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: distanceApiResponse
      })
    );

    const expected = distanceFormatter(distanceApiResponse);
    const actual = await distanceById('ChIJU_anGPp3X0YRTIbCK2z6-bA');

    expect(actual).toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith(config.api.distanceMatrix, {
      params: {
        origins: `${config.originPointCoord.lat},${
          config.originPointCoord.lng
        }`,
        destinations: 'place_id:ChIJU_anGPp3X0YRTIbCK2z6-bA',
        units: 'metric',
        mode: 'walking'
      }
    });
  });

  test('reject with status reason when not OK', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { status: 'REQUEST_DENIED' }
      })
    );

    try {
      await distanceById('ChIJU_anGPp3X0YRTIbCK2z6-bA');
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
      await distanceById('ChIJU_anGPp3X0YRTIbCK2z6-bA');
    } catch (e) {
      expect(e).toBe('Bad response from API');
    }
  });
});
