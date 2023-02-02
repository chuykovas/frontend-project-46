import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }

  if (value === null) {
    return null;
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return String(value);
};

const plain = (tree) => {
  const iter = (innerTree, depth) => {
    const result = innerTree.filter((node) => node.type !== 'unchange')
      .map((node) => {
        const { type } = node;
        const path = depth ? `${depth}.${node.key}` : node.key;

        switch (type) {
          case 'added':
            return `Property '${path}' was added with value: ${stringify(node.value)}`;
          case 'deleted':
            return `Property '${path}' was removed`;
          case 'changed':
            return `Property '${path}' was updated. From ${stringify(node.value.before)} to ${stringify(node.value.after)}`;
          case 'nested':
            return iter(node.value, path);
          default:
            throw new Error(`Unknown type ${type}`);
        }
      });

    return result.join('\n');
  };

  return iter(tree, '');
};

export default plain;
