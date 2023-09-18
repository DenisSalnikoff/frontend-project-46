import _ from 'lodash';

const genAST = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const metaAst = keys1.reduce((acc, key) => {
    const isIntact = (obj1[key] instanceof Object && obj2[key] instanceof Object)
      || (obj1[key] === obj2[key]);
    const state = isIntact ? 'intact' : 'removed';
    const getValue = () => {
      if (obj1[key] instanceof Object) {
        return genAST(obj1[key], (obj2[key] instanceof Object) ? obj2[key] : obj1[key]);
      }
      return obj1[key];
    };
    const value = getValue();
    const modAcc = [...acc, { key, value, state }];
    return modAcc;
  }, []);

  const ast = keys2.reduce((acc, key) => {
    const astElement = metaAst.find((el) => el.key === key);
    if (astElement && astElement.state === 'intact') return acc;
    const state = 'added';
    const getValue = () => {
      if (obj2[key] instanceof Object) {
        return genAST(obj2[key], obj2[key]);
      }
      return obj2[key];
    };
    const value = getValue();
    const modAcc = [...acc, { key, value, state }];
    return modAcc;
  }, metaAst);
  const getStatePriority = (state) => (state === 'added' ? 1 : 0);
  const sortedAST = _.sortBy(ast, [(el) => el.key, (el) => getStatePriority(el.state)]);
  return sortedAST;
};

export default genAST;
