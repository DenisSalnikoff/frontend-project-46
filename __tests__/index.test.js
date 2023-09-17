import { readFileSync } from 'node:fs';
import gendiff from '../index.js';
import getFormatter from '../src/formatters/index.js';

const json1 = '__tests__/file1.json';
const json2 = '__tests__/file2.json';
const yaml1 = '__tests__/file1.yaml';
const yaml2 = '__tests__/file2.yaml';

test('stylish', () => {
  const result = readFileSync('__tests__/stylish.txt').toString();
  const stylish = getFormatter('stylish');
  expect(gendiff(json1, json2, stylish)).toEqual(result);
  expect(gendiff(yaml1, yaml2, stylish)).toEqual(result);
});

test('plain', () => {
  const result = readFileSync('__tests__/plain.txt').toString();
  const plain = getFormatter('plain');
  expect(gendiff(json1, json2, plain)).toEqual(result);
  expect(gendiff(yaml1, yaml2, plain)).toEqual(result);
});

test('json', () => {
  const result = readFileSync('__tests__/json.txt').toString();
  const plain = getFormatter('json');
  expect(gendiff(json1, json2, plain)).toEqual(result);
  expect(gendiff(yaml1, yaml2, plain)).toEqual(result);
});
