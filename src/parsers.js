import { load as parseYAML } from 'js-yaml';

export default (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'yaml':
    case 'yml':
      return parseYAML;
    default: {
      throw new Error(`Unsupported format: ${format}`);
    }
  }
};
