#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const gendiff = (args, options) => {
  if (options.help) {
    const helpText = [];
    helpText.push('\n  Usage: gendiff [options]');
    helpText.push('\n  Compares two configuration files and shows a difference.');
    helpText.push('\n  Options:');
    helpText.push('    -V, --version        output the version number');
    helpText.push('    -h, --help           output usage information');
    helpText.push('    -f, --format <type>  output format');
    helpText.push('');
    console.log(helpText.join('\n'));
    return;
  }
  console.log(args);
  if (args.length !== 2) return;
  const file1 = readFileSync(resolve(cwd(), args[0]));
  const file2 = readFileSync(resolve(cwd(), args[1]));
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
  console.log(diff.join('\n'));
};

program
  .option('-h, --help')
  .arguments('[files...]')
  .action(gendiff)
  .parse();
