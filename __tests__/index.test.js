import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const result = readFile('resultCompare').trim();

test('comparison of flat json files', () => {
  expect(genDiff(getFixturePath('testfile1.json'), getFixturePath('testfile2.json'))).toEqual(result);
});

test('comparison of flat yaml files', () => {
  expect(genDiff(getFixturePath('testfile1.yml'), getFixturePath('testfile2.yml'))).toEqual(result);
});
