import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (data, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`Invalid file format type: '.${formatName}'!`);
  }
};

export default format;
