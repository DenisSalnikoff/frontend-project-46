const genStylish = (ast, startTab = '') => {
  const tabAdd = startTab === '' ? '  ' : '    ';
  const tab = startTab + tabAdd;
  const getFormattedKey = (line) => {
    if (line.state === 'removed') return `- ${line.key}`;
    if (line.state === 'added') return `+ ${line.key}`;
    return `  ${line.key}`;
  };
  const diffList = ast.map((line) => {
    const value = Array.isArray(line.value) ? `{\n${genStylish(line.value, tab)}` : line.value;
    return `${tab}${getFormattedKey(line)}: ${value}`;
  });
  if (startTab === '') {
    diffList.unshift('{');
    diffList.push('}');
  } else {
    diffList.push(`${startTab}  }`);
  }
  return diffList.join('\n');
};

export default genStylish;
