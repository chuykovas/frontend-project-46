import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

const isObject = (value) => {
  if (value === null || Array.isArray(value)) {
    return false;
  }
  return typeof value === 'object';
};

const compareData = (firstData, secondData) => {
  const iter = (obj1, obj2, accumulator) => {
    const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
    const sortedCommonKeys = _.sortBy(commonKeys);
    const result = accumulator;

    sortedCommonKeys.forEach((key) => {
      if (!Object.hasOwn(obj1, key)) {
        result[`+ ${key}`] = obj2[key];
      } else if (!Object.hasOwn(obj2, key)) {
        result[`- ${key}`] = obj1[key];
      } else if (obj1[key] !== obj2[key]) {
        if (isObject(obj1[key]) && isObject(obj2[key])) {
          result[` ${key}`] = iter(obj1[key], obj2[key], result);
        } else {
          result[`- ${key}`] = obj1[key];
          result[`+ ${key}`] = obj2[key];
        }
      } else {
        result[`  ${key}`] = obj1[key];
      }
    });

    return result;
  };

  return iter(firstData, secondData, {});
};

function genDiff(filepath1, filepath2) {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const firstFileData = parser(filepath1, firstFile);
  const secondFileData = parser(filepath2, secondFile);

  const compareResult = compareData(firstFileData, secondFileData);

  return compareResult;
}

export default genDiff;
