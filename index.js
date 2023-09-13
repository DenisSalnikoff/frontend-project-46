import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const gendiff = (filepath1, filepath2) => {
  const file1 = readFileSync(resolve(cwd(), filepath1));
  const file2 = readFileSync(resolve(cwd(), filepath2));
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const preDiff = keys1.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      acc.push(`  ${key}: ${obj1[key]}`);
    } else {
      acc.push(`- ${key}: ${obj1[key]}`);
      if (Object.hasOwn(obj2, key)) {
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
    }
    return acc;
  }, []);
  const diff = keys2
    .reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key)) {
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
      return acc;
    }, preDiff)
    .sort((first, second) => {
      const sortCharNumber = 2;
      const a = first[sortCharNumber];
      const b = second[sortCharNumber];
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  return diff.join('\n');
};

const antiPreferDefaultExport = () => null;

export { gendiff, antiPreferDefaultExport };
