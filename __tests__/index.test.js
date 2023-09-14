import { readFileSync } from 'node:fs';
import { gendiff } from '../index.js';
import getFormatter from '../src/formatters.js';

test('gendiff', () => {
  const result = readFileSync('__tests__/result.txt').toString();
  const json1 = '__tests__/file1.json';
  const json2 = '__tests__/file2.json';
  const yaml1 = '__tests__/file1.yaml';
  const yaml2 = '__tests__/file2.yaml';
  const stylish = getFormatter('stylish');
  expect(gendiff(json1, json2, stylish)).toEqual(result);
  expect(gendiff(yaml1, yaml2, stylish)).toEqual(result);
});
