import { readFileSync } from 'node:fs';
import gendiff from '../src/gendiff.js';

const json1 = '__tests__/__fixtures__/file1.json';
const json2 = '__tests__/__fixtures__/file2.json';
const yaml1 = '__tests__/__fixtures__/file1.yaml';
const yaml2 = '__tests__/__fixtures__/file2.yaml';

test('stylish', () => {
  const result = readFileSync('__tests__/__fixtures__/stylish.txt').toString();
  expect(gendiff(json1, json2, 'stylish')).toEqual(result);
  expect(gendiff(yaml1, yaml2, 'stylish')).toEqual(result);
});

test('plain', () => {
  const result = readFileSync('__tests__/__fixtures__/plain.txt').toString();
  expect(gendiff(json1, json2, 'plain')).toEqual(result);
  expect(gendiff(yaml1, yaml2, 'plain')).toEqual(result);
});

test('json', () => {
  const result = readFileSync('__tests__/__fixtures__/json.txt').toString();
  expect(gendiff(json1, json2, 'json')).toEqual(result);
  expect(gendiff(yaml1, yaml2, 'json')).toEqual(result);
});
