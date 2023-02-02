import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Invalid file format type: '.${formatName}'!`);
  }
};

export default format;
