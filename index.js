import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

const compareData = (firstData, secondData) => {
  const commonKeys = _.union(Object.keys(firstData), Object.keys(secondData));
  const sortedCommonKeys = _.sortBy(commonKeys);
  const result = {};

  sortedCommonKeys.forEach((key) => {
    if (!Object.hasOwn(firstData, key)) {
      result[`+ ${key}`] = secondData[key];
    } else if (!Object.hasOwn(secondData, key)) {
      result[`- ${key}`] = firstData[key];
    } else if (firstData[key] !== secondData[key]) {
      result[`- ${key}`] = firstData[key];
      result[`+ ${key}`] = secondData[key];
    } else {
      result[`  ${key}`] = firstData[key];
    }
  });

  return result;
};

const objToString = (obj) => {
  let str = '{\n';
  const arrayPropertyObj = Object.entries(obj);
  arrayPropertyObj.forEach((property) => {
    str += `  ${property[0]}: ${property[1]}\n`;
  });

  str += '}';

  return str;
};

function genDiff(filepath1, filepath2) {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const firstFileData = parser(filepath1, firstFile);
  const secondFileData = parser(filepath2, secondFile);

  console.log(`1${path.resolve(filepath1)}  2${path.resolve(filepath2)}`);

  const compareResult = compareData(firstFileData, secondFileData);

  return objToString(compareResult);
}

export default genDiff;
