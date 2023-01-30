import path from 'path';
import yaml from 'js-yaml';

export default function parser(filepath, data) {
  const typeFile = path.extname(filepath);
  let parse = null;

  if (typeFile === '' || typeFile === '.json') {
    parse = JSON.parse;
  } else if (typeFile === '.yml' || typeFile === '.yaml') {
    parse = yaml.load;
  }

  return parse(data);
}
