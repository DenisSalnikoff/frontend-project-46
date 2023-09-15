#!/usr/bin/env node

import { program } from 'commander';
import run from '../src/gendiff.js';

program
  .option('-h, --help')
  .option('-f, --format <type>', 'format used', 'stylish')
  .arguments('[files...]')
  .action(run)
  .parse();
