import _ from 'lodash';

const genAST = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.uniq([...keys1, ...keys2]);
  const ast = keys.reduce((acc, key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      const line = { key, state: 'removed', value: obj1[key] };
      return [...acc, line];
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      const line = { key, state: 'added', value: obj2[key] };
      return [...acc, line];
    }
    if (obj1[key] === obj2[key]) {
      const line = { key, state: 'intact', value: obj1[key] };
      return [...acc, line];
    }
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      const line = { key, state: 'intact', value: genAST(obj1[key], obj2[key]) };
      return [...acc, line];
    }
    const line1 = { key, state: 'removed', value: obj1[key] };
    const line2 = { key, state: 'added', value: obj2[key] };
    return [...acc, line1, line2];
  }, []);
  const getStatePriority = (state) => (state === 'added' ? 1 : 0);
  const sortedAST = _.sortBy(ast, [(el) => el.key, (el) => getStatePriority(el.state)]);
  return sortedAST;
};

export default genAST;
