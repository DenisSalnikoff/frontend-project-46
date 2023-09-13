import { readFileSync } from 'node:fs';
import { gendiff } from '../index.js';

test('gendiff', () => {
  const result = readFileSync('__tests__/result.txt').toString();
  expect(gendiff('__tests__/file1.json', '__tests__/file2.json')).toEqual(result);
});
