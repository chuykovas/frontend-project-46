import path from 'path';
import yaml from 'js-yaml';

export default function parser(filepath, data) {
  const typeFile = path.extname(filepath);

  if (typeFile === '' || typeFile === '.json') {
    return JSON.parse(data);
  }
  if (typeFile === '.yml' || typeFile === '.yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unknown type ${typeFile}`);
}
