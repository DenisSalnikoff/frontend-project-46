import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import getParser from './src/parsers';

const genAddKey = (key) => `+ ${key}`;
const genRemoveKey = (key) => `- ${key}`;
const genIntactKey = (key) => `  ${key}`;

const stringifyDiff = (diffObj, startTab = '') => {
  const tabAdd = startTab === '' ? '  ' : '    ';
  const tab = startTab + tabAdd;
  const diffArr = Object.keys(diffObj)
    .sort((first, second) => {
      const sortCharNumber = 2;
      const a = first.slice(sortCharNumber);
      const b = second.slice(sortCharNumber);
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    .map((key) => {
      const value = (diffObj[key] instanceof Object) ? `{\n${stringifyDiff(diffObj[key], tab)}` : diffObj[key];
      return `${tab}${key}: ${value}`;
    });
  if (startTab === '') {
    diffArr.unshift('{');
    diffArr.push('}');
  } else {
    diffArr.push(`${startTab}  }`);
  }
  return diffArr.join('\n');
};

const genObjDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  let diffObj = keys1.reduce((acc, key) => {
    // сразу определяем ключ возможного изменения
    const isIntactKey = (obj1[key] instanceof Object && obj2[key] instanceof Object)
      || (obj1[key] === obj2[key]);
    const diffKey = isIntactKey ? genIntactKey(key) : genRemoveKey(key);
    // рекурсия, если свойство является объектом
    if (obj1[key] instanceof Object) {
      acc[diffKey] = genObjDiff(obj1[key], (obj2[key] instanceof Object) ? obj2[key] : obj1[key]);
      return acc;
    }
    // обычная обработка, если свойство является значением
    acc[diffKey] = obj1[key];
    return acc;
  }, {});

  diffObj = keys2.reduce((acc, key) => {
    // сразу определяем ключ возможного изменения
    const diffKey = genAddKey(key);
    // рекурсия, если свойство является объектом
    if (obj2[key] instanceof Object) {
      if (!(obj1[key] instanceof Object)) { // если этот случай не обработан предыдущем цикле
        acc[diffKey] = genObjDiff(obj2[key], obj2[key]);
      }
      return acc;
    }
    // обычная обработка, если свойство является значением
    if (obj2[key] !== obj1[key]) acc[diffKey] = obj2[key];
    return acc;
  }, diffObj);

  return diffObj;
};

const gendiff = (filepath1, filepath2) => {
  const file1 = readFileSync(resolve(cwd(), filepath1));
  const file2 = readFileSync(resolve(cwd(), filepath2));
  const parser = getParser(extname(filepath1));
  if (!parser) {
    return `Не удалось определить парсер для ${filepath1}`;
  }
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  const diffObj = genObjDiff(obj1, obj2);
  return stringifyDiff(diffObj);
};

const antiPreferDefaultExport = () => null;

export { gendiff, antiPreferDefaultExport };
