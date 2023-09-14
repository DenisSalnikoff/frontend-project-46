//  Formatters

const stylish = (diffObj, startTab = '') => {
  const tabAdd = startTab === '' ? '  ' : '    ';
  const tab = startTab + tabAdd;
  const diffArr = Object.keys(diffObj)
    .sort((first, second) => {
      const sortCharNumber = 2;
      const a = first.slice(sortCharNumber);
      const b = second.slice(sortCharNumber);
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    .map((key) => {
      const value = (diffObj[key] instanceof Object) ? `{\n${stylish(diffObj[key], tab)}` : diffObj[key];
      return `${tab}${key}: ${value}`;
    });
  if (startTab === '') {
    diffArr.unshift('{');
    diffArr.push('}');
  } else {
    diffArr.push(`${startTab}  }`);
  }
  return diffArr.join('\n');
};

export default (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    default:
      return undefined;
  }
};
