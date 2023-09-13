import { fail } from 'node:assert';
import { gendiff } from '../index.js';
import { readFileSync } from 'node:fs';

test('gendiff', () => {
  const result = readFileSync('__tests__/result.txt').toString();
  expect(gendiff('__tests__/file1.json', '__tests__/file2.json')).toEqual(result);
});
