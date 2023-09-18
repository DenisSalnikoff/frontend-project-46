const getFormattedKey = (line) => {
  if (line.state === 'removed') return `- ${line.key}`;
  if (line.state === 'added') return `+ ${line.key}`;
  return `  ${line.key}`;
};

const addCurlyBraces = (diffList, startTab) => {
  if (startTab === '') return ['{', ...diffList, '}'];
  return [...diffList, `${startTab}  }`];
};

const genStylish = (ast, startTab = '') => {
  const tabAdd = startTab === '' ? '  ' : '    ';
  const tab = startTab + tabAdd;
  const diffList = ast.map((line) => {
    const value = Array.isArray(line.value) ? `{\n${genStylish(line.value, tab)}` : line.value;
    return `${tab}${getFormattedKey(line)}: ${value}`;
  });
  const bracedDiffList = addCurlyBraces(diffList, startTab);
  return bracedDiffList.join('\n');
};

export default genStylish;
