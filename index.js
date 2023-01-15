import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const compareData = (firstData, secondData) => {
  const commonKeys = _.union(Object.keys(firstData), Object.keys(secondData));
    const sortedCommonKeys = _.sortBy(commonKeys);
    const result = {};

    for (const key of sortedCommonKeys) {
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
    }

    return result;
}

const objToString = (obj) => {
  let str = '{\n';
  for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
          str += `  ${property}: ${obj[property]}\n`;
      }
  }
  return str+='}';
}

function genDiff (filepath1, filepath2) {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
    const typeFirstFile = filepath1.split('.')[1];
    const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');
    const typeSecondFile = filepath2.split('.')[1];

    let firstFileData;
    let secondFileData;

    if(typeFirstFile === 'json') {
      firstFileData = JSON.parse(firstFile);
    }   

    if(typeSecondFile === 'json') {
      secondFileData = JSON.parse(secondFile);
    }

    const compareResult = compareData(firstFileData, secondFileData);

    return objToString(compareResult);
}

export default genDiff;
