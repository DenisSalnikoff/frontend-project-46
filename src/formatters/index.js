import genStylish from './stylish.js';
import genPlain from './plain.js';

export default (format) => {
  switch (format) {
    case 'stylish':
      return genStylish;
    case 'plain':
      return genPlain;
    default:
      return undefined;
  }
};
