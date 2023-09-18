import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import genAST from './genAST.js';

const gendiff = (filepath1, filepath2, formatName) => {
  const file1 = readFileSync(resolve(cwd(), filepath1));
  const file2 = readFileSync(resolve(cwd(), filepath2));
  const parser1 = getParser(extname(filepath1));
  const parser2 = getParser(extname(filepath1));
  if (!parser1) {
    return `Failed to identify the parser for ${filepath1}`;
  }
  if (!parser2) {
    return `Failed to identify the parser for ${filepath2}`;
  }
  const obj1 = parser1(file1);
  const obj2 = parser2(file2);
  const ast = genAST(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(ast);
};

export default gendiff;
