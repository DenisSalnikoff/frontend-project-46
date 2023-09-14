import { load as parseYAML } from 'js-yaml';

const jsonParser = (file) => JSON.parse(file);
const yamlParser = (file) => parseYAML(file);

export default (extname) => {
  switch (extname) {
    case '.json':
      return jsonParser;
    case '.yaml':
    case '.yml':
      return yamlParser;
    default:
      return undefined;
  }
};
