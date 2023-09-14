import getFormatter from './formatters.js';
import { gendiff } from '../index.js';

export default (args, options) => {
  if (options.help) {
    const helpText = [];
    helpText.push('\n  Usage: gendiff [options]');
    helpText.push('\n  Compares two configuration files and shows a difference.');
    helpText.push('\n  Options:');
    helpText.push('    -v, --version        output the version number');
    helpText.push('    -h, --help           output usage information');
    helpText.push('    -f, --format <type>  output format (default: "stylish")');
    helpText.push('');
    console.log(helpText.join('\n'));
    return;
  }
  if (args.length !== 2) return;
  const [file1, file2] = args;
  const formatter = getFormatter(options.format);
  if (!formatter) return;
  const difference = gendiff(file1, file2, formatter);
  console.log(difference);
};
