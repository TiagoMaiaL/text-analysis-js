
/**
 * Given a text, returns it formatted for analysis.
 * @param {String} text - The text to be sinitized.
 * @returns {String} sanitizedText - The sanitized text.
 */
function sanitize(text) {
  if (typeof text !== 'string') {
    throw new Error('Only texts can be sanitized.')
  }

  return text.toLowerCase()
}

/**
 * Given a text, returns an array containing all of its chars.
 * @param {String} text - The string to be get the chars from.
 * @returns {Array} chars - The chars contained in the given text.
 */
function getChars(text) {
  if (typeof text !== 'string') {
    throw new Error('The text parameter must be a string in order for this function to work.')
  }

  return text.split('');
}

/**
 * Given an input Array, returns a Map containing the count of each item in the input.
 * @param {Array} array - The array of items to count
 * @returns {Map} counts - A Map containing the counts of the items in the input array
 */
function itemCounts(array) {
  return array.reduce(function(map, value) {
    const currentCount = map.has(value) ? map.get(value) : 0;
    map.set(value, currentCount + 1);

    return map;
  }, new Map());
}

/**
 * Given a count of chars in a text, gets its map of chars and occurences, and calculates a map of chars and frequencies based
 * on the passed count of chars.
 * @param {Integer} totalCount - The total amount of chars in a text.
 * @param {Map} itemCounts - A map containing the occurrences of each char in the text.
 * @returns {Map} itemFrequencies - A map containing the frequencies of each char based on the total count.
 */
function itemFrequencies(totalCount, itemCounts) {
  if (totalCount <= 0) {
    throw new Error('The items frequencies can\'t be computed without a total count of chars.');
  }

  if (typeof itemCounts != 'object' || !(itemCounts instanceof Map)) {
    throw new Error('The item frequencies must be a valid map.');
  }

  let itemFrequencies = new Map();

  for (let [key, value] of itemCounts) {
    itemFrequencies.set(key, value / totalCount)
  }
  
  return itemFrequencies;
}

/**
 * Given an input Map, get the text to print it to the user.
 * @param {Map} map - The map to be printed to the user.
 * @returns {String} text - The text to be displayed to the user.
 */
function getPrintStatistics(map) {
  let output = '';

  for (let [key, value] of map) {
    output += `${key} \t ${value} \n`;
  }

  return output;
}

/**
 * Given a file path, read the file and analyzes its text, printing the statistics to the user.
 * @param {String} path - The path of the file to be analyzed.
 */
function analyzeFile(path) {
  const fs = require('fs');

  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      throw error;
    }

    const sanitizedText = sanitize(data);
    const textLength = sanitizedText.length;
    const counts = itemCounts(getChars(sanitizedText));
    const frequencies = itemFrequencies(textLength, counts);

    console.log(`The analysis of the file at ${path} is...`);
    console.log(getPrintStatistics(frequencies));
  });
}

if (require.main == module) {
  let textFiles = process.argv.slice(2);

  if (textFiles.length == 0) {
    throw new Error('Please, include the text files to be analyzed as arguments. Example usage: npm start path-of-the-file-to-analyze ...')
  }

  textFiles.forEach((filePath) => {
    analyzeFile(filePath);
  });
}

module.exports = { sanitize, getChars, itemCounts, itemFrequencies };
