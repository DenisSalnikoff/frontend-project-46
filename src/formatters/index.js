import genStylish from './stylish.js';
import genPlain from './plain.js';
import genJSON from './json.js';

export default (f) => {
  const format = f.toLowerCase();
  switch (format) {
    case 'stylish':
      return genStylish;
    case 'plain':
      return genPlain;
    case 'json':
      return genJSON;
    default:
      return undefined;
  }
};
