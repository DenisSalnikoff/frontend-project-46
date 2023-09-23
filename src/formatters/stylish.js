const formatKey = (line) => {
  if (line.state === 'removed') return `- ${line.key}`;
  if (line.state === 'added') return `+ ${line.key}`;
  return `  ${line.key}`;
};

const addCurlyBraces = (diffList, startTab) => {
  if (startTab === '') return ['{', ...diffList, '}'];
  return [...diffList, `${startTab}  }`];
};

const formatObj = (obj, startTab, tabAdd) => {
  const tab = startTab + tabAdd;
  const result = Object.keys(obj)
    .map((key) => {
      const value = obj[key] instanceof Object ? `{\n${formatObj(obj[key], tab, tabAdd)}` : `${obj[key]}`;
      return `  ${tab}${key}: ${value}`;
    });
  return [...result, `${startTab}  }`].join('\n');
};

const genStylish = (ast, startTab = '') => {
  const firstTabAdd = '  ';
  const nextTabAdd = '    ';
  const tabAdd = startTab === '' ? firstTabAdd : nextTabAdd;
  const tab = startTab + tabAdd;
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return `{\n${genStylish(value, tab)}`;
    }
    if (value instanceof Object) {
      return `{\n${formatObj(value, tab, nextTabAdd)}`;
    }
    return value;
  };
  const diffList = ast.map((line) => {
    const value = formatValue(line.value);
    return `${tab}${formatKey(line)}: ${value}`;
  });
  const bracedDiffList = addCurlyBraces(diffList, startTab);
  return bracedDiffList.join('\n');
};

export default genStylish;
