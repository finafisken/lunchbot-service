const placeId = '123';
const addSpy = jest.fn(() => 'added response');
const placesSpy = jest.fn(f => Promise.resolve({ placeId }));
jest.doMock('../../services/dynamodb.js', () => ({ addItem: addSpy }));
jest.doMock('../../services/placesApi.js', () => ({ placesSearchById: placesSpy }));
const addSuggestion = require('../addSuggestion');

describe('Add suggestion logic', () => {
  test('calls dynamodb add', async () => {
    const result = await addSuggestion(placeId);
    const expected = { placeId, lastVisitedAt: 0 };

    expect(addSpy).toHaveBeenCalledWith(expected);
    expect(result).toBe('added response');
  });
});