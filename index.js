import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import getParser from './src/parsers';

const gendiff = (filepath1, filepath2) => {
  const file1 = readFileSync(resolve(cwd(), filepath1));
  const file2 = readFileSync(resolve(cwd(), filepath2));
  const parser = getParser(extname(filepath1));
  if (!parser) {
    return `Не удалось определить парсер для ${filepath1}`;
  }
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const preDiff = keys1.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      acc.push(`    ${key}: ${obj1[key]}`);
    } else {
      acc.push(`  - ${key}: ${obj1[key]}`);
      if (Object.hasOwn(obj2, key)) {
        acc.push(`  + ${key}: ${obj2[key]}`);
      }
    }
    return acc;
  }, []);
  const diff = keys2
    .reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key)) {
        acc.push(`  + ${key}: ${obj2[key]}`);
      }
      return acc;
    }, preDiff)
    .sort((first, second) => {
      const sortCharNumber = 4;
      const a = first[sortCharNumber];
      const b = second[sortCharNumber];
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  diff.unshift('{');
  diff.push('}');
  return diff.join('\n');
};

const antiPreferDefaultExport = () => null;

export { gendiff, antiPreferDefaultExport };
