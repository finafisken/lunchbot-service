const updateSpy = jest.fn(() => 'updated response');
jest.doMock('../../services/dynamodb.js', () => ({ updateItem: updateSpy }));
const visitedSuggestion = require('../visitedSuggestion');
const placeId = '123';

describe('Visited suggestion logic', () => {
  test('calls dynamodb update', () => {
    const result = visitedSuggestion(placeId);

    expect(updateSpy).toHaveBeenCalledWith(placeId);
    expect(result).toBe('updated response');
  });
});