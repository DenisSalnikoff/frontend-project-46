import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import genAST from './genAST.js';

const defFormat = (filepath) => {
  const ext = extname(filepath);
  const format = ext.length > 0 ? ext.slice(1) : ext;
  return format;
};

const gendiff = (filepath1, filepath2, formatName) => {
  const file1 = readFileSync(resolve(cwd(), filepath1));
  const file2 = readFileSync(resolve(cwd(), filepath2));
  const parseFile1 = getParser(defFormat(filepath1));
  const parseFile2 = getParser(defFormat(filepath2));
  const obj1 = parseFile1(file1);
  const obj2 = parseFile2(file2);
  const ast = genAST(obj1, obj2);
  const format = getFormatter(formatName);
  return format(ast);
};

export default gendiff;
