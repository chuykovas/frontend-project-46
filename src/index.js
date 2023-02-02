import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';
import format from './formatters/index.js';

const compareData = (firstData, secondData) => {
  const commonKeys = _.union(Object.keys(firstData), Object.keys(secondData));
  const sortedCommonKeys = _.sortBy(commonKeys);
  return sortedCommonKeys.map((key) => {
    if (!Object.hasOwn(firstData, key)) {
      return { key, value: secondData[key], type: 'added' };
    }
    if (!Object.hasOwn(secondData, key)) {
      return { key, value: firstData[key], type: 'deleted' };
    }
    if (_.isObject(firstData[key]) && _.isObject(secondData[key])) {
      return { key, value: compareData(firstData[key], secondData[key]), type: 'nested' };
    }
    if (!_.isEqual(firstData[key], secondData[key])) {
      const value = {
        before: firstData[key],
        after: secondData[key],
      };
      return { key, value, type: 'changed' };
    }

    return { key, value: firstData[key], type: 'unchange' };
  });
};

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const firstFileData = parser(filepath1, firstFile);
  const secondFileData = parser(filepath2, secondFile);

  const compareResult = compareData(firstFileData, secondFileData);

  return format(compareResult, formatName);
}

export default genDiff;
