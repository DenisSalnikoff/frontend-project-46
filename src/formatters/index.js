import genStylish from './stylish.js';
import genPlain from './plain.js';
import genJSON from './json.js';

export default (format) => {
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
