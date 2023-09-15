import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import getParser from './src/parsers.js';

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

  return ast;
};

const gendiff = (filepath1, filepath2, formatter) => {
  const file1 = readFileSync(resolve(cwd(), filepath1));
  const file2 = readFileSync(resolve(cwd(), filepath2));
  const parser = getParser(extname(filepath1));
  if (!parser) {
    return `Не удалось определить парсер для ${filepath1}`;
  }
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  const diffObj = genAST(obj1, obj2);
  return formatter(diffObj);
};

const antiPreferDefaultExport = () => null;

export { gendiff, antiPreferDefaultExport };
