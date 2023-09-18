const getFormattedValue = (line) => {
  const value = Array.isArray(line.value) ? '[complex value]' : line.value;
  return typeof line.value === 'string' ? `'${value}'` : value;
};

const genPlain = (ast, path = '') => {
  const diffArr = ast.reduce((acc, line, i) => {
    switch (line.state) {
      case 'removed': {
        const nextLine = ast[i + 1];
        if (nextLine && nextLine.key === line.key) {
          const remValue = getFormattedValue(line);
          const addValue = getFormattedValue(nextLine);
          const addLine = `Property '${path}${line.key}' was updated. From ${remValue} to ${addValue}`;
          return [...acc, addLine];
        }
        const addLine = `Property '${path}${line.key}' was removed`;
        return [...acc, addLine];
      }
      case 'added': {
        const prevLine = ast[i - 1];
        if (!prevLine || prevLine.key !== line.key) {
          const addValue = getFormattedValue(line);
          const addLine = `Property '${path}${line.key}' was added with value: ${addValue}`;
          return [...acc, addLine];
        }
        break;
      }
      case 'intact':
        if (Array.isArray(line.value)) {
          const addLine = genPlain(line.value, `${path}${line.key}.`);
          if (addLine.length) return [...acc, addLine];
        }
        break;
      default: // nothing
    }
    return acc;
  }, []);
  return diffArr.join('\n');
};

export default genPlain;
