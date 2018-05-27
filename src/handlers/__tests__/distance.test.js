const mockedAxios = require('axios');
const distance = require('../distance.js');
const { distanceFormatter } = require('../formatter.js');
const config = require('../../../config/main.js');

const distanceApiResponse = require('./data/distanceApiResponse.json');

describe('Distance by id handler', () => {
  test('correct response on valid request', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: distanceApiResponse
      })
    );

    const expected = distanceFormatter(distanceApiResponse);
    let actual;
    await distance(
      { params: { placeId: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

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

  test('status code 500 when API response status not OK', async () => {
    // since we expect an error, don't bloat the test
    console.error = jest.fn();

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { status: 'REQUEST_DENIED' }
      })
    );

    let actual;
    await distance(
      { params: { placeId: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toBe(500);
    expect(console.error).toHaveBeenCalled();
    console.error.mockRestore();
  });

  test('status code 500 when API request failed', async () => {
    // since we expect an error, don't bloat the test
    console.error = jest.fn();

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject('something broken')
    );

    let actual;
    await distance(
      { params: { placeId: 'ChIJU_anGPp3X0YRTIbCK2z6-bA' } },
      {
        send: res => (actual = res),
        sendStatus: status => (actual = status)
      }
    );

    expect(actual).toBe(500);
    expect(console.error).toHaveBeenCalled();
    console.error.mockRestore();
  });
});
