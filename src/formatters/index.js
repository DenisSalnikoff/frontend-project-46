import stylish from './stylish.js';

export default (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    default:
      return undefined;
  }
};
