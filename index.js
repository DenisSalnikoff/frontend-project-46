import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import getParser from './src/parsers.js';
import getFormatter from './src/formatters/index.js';

const genAST = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  let ast = keys1.reduce((acc, key) => {
    // определяем статус свойства. Для первого файла может быть либо 'intact' либо 'removed'.
    const isIntact = (obj1[key] instanceof Object && obj2[key] instanceof Object)
      || (obj1[key] === obj2[key]);
    const state = isIntact ? 'intact' : 'removed';
    const getValue = () => {
      if (obj1[key] instanceof Object) {
        return genAST(obj1[key], (obj2[key] instanceof Object) ? obj2[key] : obj1[key]);
      }
      return obj1[key];
    };
    const value = getValue();
    acc.push({ key, value, state });
    return acc;
  }, []);

  ast = keys2.reduce((acc, key) => {
    // проверяем необходимость добавления элемента
    const astElement = ast.find((el) => el.key === key);
    if (astElement && astElement.state === 'intact') return acc;
    // определяем статус свойства. Для второго файла может быть только 'added'.
    const state = 'added';
    const getValue = () => {
      if (obj2[key] instanceof Object) {
        return genAST(obj2[key], obj2[key]);
      }
      return obj2[key];
    };
    const value = getValue();
    acc.push({ key, value, state });
    return acc;
  }, ast);
  ast.sort((a, b) => {
    if (a.key > b.key) return 1;
    if (a.key < b.key) return -1;
    const getStateValue = (state) => (state === 'added' ? 1 : -1);
    return getStateValue(a.state) - getStateValue(b.state);
  });
  return ast;
};

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
