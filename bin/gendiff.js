#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/gendiff.js';

const run = (filepath1, filepath2, options) => {
  const difference = gendiff(filepath1, filepath2, options.format);
  console.log(difference);
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action(run)
  .parse();
