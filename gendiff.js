#!/usr/bin/env node

const { program } = require('commander');

program
  .option('-h, --help')
  .parse();
const options = program.opts();
if (options.help) {
  const helpText = [];
  helpText.push('\nUsage: gendiff [options]');
  helpText.push('\nCompares two configuration files and shows a difference.');
  helpText.push('\nOptions:');
  helpText.push('  -V, --version        output the version number');
  helpText.push('  -h, --help           output usage information\n');
  console.log(helpText.join('\n'));
}
