#!/usr/bin/env node

const { program } = require('commander');

program
  .option('-h, --help')
  .parse();
const options = program.opts();
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
}
