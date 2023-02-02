import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedStylish = readFile('correction-stylish.txt').trim();
const expectedPlain = readFile('correction-plain.txt').trim();


const extensions = ['json', 'yaml', 'yml'];

describe('Positive testcases', () => {
  test.each(extensions)('Format %s', (extension) => {
    const file1 = path.join(process.cwd(), '__fixtures__', `testfile1.${extension}`);
    const file2 = path.join(process.cwd(), '__fixtures__', `testfile2.${extension}`);

    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
  });
});
