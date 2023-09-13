#!/usr/bin/env node

import { program } from 'commander';
import run from '../src/gendiff.js';

program
  .option('-h, --help')
  .arguments('[files...]')
  .action(run)
  .parse();
