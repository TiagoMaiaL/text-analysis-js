const { sanitize, getChars, itemCounts, itemFrequencies, getPrintStatistics } = require('../textalyze');

describe('itemCount', () => {
  test('returns a count of the strings in the array', () => {
    const input = ['one', 'two', 'three', 'one', 'two', 'ZZZZ'];
    const expectedOutput = new Map([['one', 2], ['two', 2], ['three', 1], ['ZZZZ', 1]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('returns an empty hash when array is empty', () => {
    const input = [];
    const expectedOutput = new Map();

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('counts multiple words', () => {
    const input = ['hi', 'hi', 'hi'];
    const expectedOutput = new Map([['hi', 3]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('handles non-string inputs', () => {
    const input = ['null', null, '10', 10];
    const expectedOutput = new Map([['null', 1], [null, 1], ['10', 1], [10, 1]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('is case-sensitive', () => {
    const input = ['a', 'A', 'a', 'A'];
    const expectedOutput = new Map([['a', 2], ['A', 2]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });
});

describe('getChars', () => {
  test('returns an empty array of chars if an empty text is passed', () => {
    expect(getChars('')).toEqual([]);
  });

  test('returns the chars passed in the array', () => {
    const input = 'Testing input';
    const expectedOutput = ['T', 'e', 's', 't', 'i', 'n', 'g', ' ', 'i', 'n', 'p', 'u', 't'];

    expect(getChars(input)).toEqual(expectedOutput);
  });

  test('throws an error when the passed text isn\'t a string', () => {
    expect(getChars).toThrow(new Error('The text parameter must be a string in order for this function to work.'));
  });
});

describe('sanitize', () => {
  test('returns the passed text in lowercase', () => {
    const input = 'HEY: ThIs Is hArD tO rEaD!';
    const expectedOutput = "hey: this is hard to read!";

    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('throws an error when the passed text isn\'t a string', () => {
    expect(sanitize).toThrow(new Error('Only texts can be sanitized.'));
  });
});

describe('itemFrequencies', () => {
  test('throws an exception when a non item counts Map argument is passed', () => {
    expect(() => {
      itemFrequencies(27, null);
    }).toThrow(new TypeError('The item frequencies must be a valid map.'));
  });

  test('returns an empty map when an empty item count is passed', () => {
    expect(itemFrequencies(new Map())).toEqual(new Map());
  });

  test('returns the item frequencies determined by the total count and item counts', () => {
    const inputCounts = new Map([['a', 25], ['b', 10], ['c', 10], ['d', 5]]);
    const expectedOutput = new Map([['a', 0.50], ['b', 0.20], ['c', 0.20], ['d', 0.10]]);

    expect(itemFrequencies(inputCounts)).toEqual(expectedOutput);
  });
});

describe('getPrintStatistics', () => {
  test('it returns an empty string when the provided map is empty', () => {
    expect(getPrintStatistics(new Map())).toEqual('');
  });

  test('it returns a line for each map entry', () => {
    const input = new Map([['a', 125], ['b', 167], ['c', 296], ['d', 2550]]);
    const expectedLineCount = input.size + 1; // Includes a last linebreak.

    expect(getPrintStatistics(input).split('\n').length).toEqual(expectedLineCount);
  });

  test('it returns the expected text format of the lines', () => {
    const input = new Map([['a', 1966], ['b', 2.25]]);
    const expectedOutput = 'a \t 1966 \nb \t 2.25 \n';

    expect(getPrintStatistics(input)).toEqual(expectedOutput);
  });
});
