import gendiff from '../index.js';

export default (args, options) => {
  if (options.help) {
    console.log('\n  Usage: gendiff [options]\n'
      + '\n  Compares two configuration files and shows a difference.\n'
      + '\n  Options:\n'
      + '    -v, --version        output the version number\n'
      + '    -h, --help           output usage information\n'
      + '    -f, --format <type>  output format (default: "stylish")\n');
    return;
  }
  if (args.length !== 2) {
    console.log('Incorrect number of arguments. There should be two.');
    return;
  }
  const [file1, file2] = args;
  const difference = gendiff(file1, file2, options.format);
  console.log(difference);
};
