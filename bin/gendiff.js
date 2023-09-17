#!/usr/bin/env node

import { program } from 'commander';
import run from '../src/gendiff.js';

program
  .option('-h, --help')
  .option('-f, --format <type>')
  .arguments('[files...]')
  .action(run)
  .parse();
