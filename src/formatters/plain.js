const genPlain = (ast, path = '') => {
  const diffArr = ast.reduce((acc, line, i) => {
    switch (line.state) {
      case 'removed': {
        const nextLine = ast[i + 1];
        if (nextLine && nextLine.key === line.key) {
          let remValue = Array.isArray(line.value) ? '[complex value]' : line.value;
          if (typeof line.value === 'string') remValue = `'${remValue}'`;
          let addValue = Array.isArray(nextLine.value) ? '[complex value]' : nextLine.value;
          if (typeof nextLine.value === 'string') addValue = `'${addValue}'`;
          acc.push(`Property '${path}${line.key}' was updated. From ${remValue} to ${addValue}`);
        } else {
          acc.push(`Property '${path}${line.key}' was removed`);
        }
        break;
      }
      case 'added': {
        const prevLine = ast[i - 1];
        if (!prevLine || prevLine.key !== line.key) {
          let addValue = Array.isArray(line.value) ? '[complex value]' : line.value;
          if (typeof line.value === 'string') addValue = `'${addValue}'`;
          acc.push(`Property '${path}${line.key}' was added with value: ${addValue}`);
        }
        break;
      }
      case 'intact':
        if (Array.isArray(line.value)) {
          const addLines = genPlain(line.value, `${path}${line.key}.`);
          if (addLines.length) acc.push(addLines);
        }
        break;
      default: // nothing
    }
    return acc;
  }, []);
  return diffArr.join('\n');
};

export default genPlain;
