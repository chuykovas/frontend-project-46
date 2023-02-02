const sign = {
  added: '+',
  deleted: '-',
  unchange: ' ',
};

const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (element, depth) => {
  if (typeof element !== 'object') {
    return `${element}`;
  }

  if (element === null) {
    return null;
  }

  const lines = Object.entries(element).map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${indent(depth)}  }`,
  ].join('\n');
};

const stylish = (tree) => {
  const iter = (innerTree, depth) => {
    const result = innerTree.map((node) => {
      const { type } = node;

      switch (type) {
        case 'added':
          return `${indent(depth)}${sign.added} ${node.key}: ${stringify(node.value, depth)}\n`;
        case 'deleted':
          return `${indent(depth)}${sign.deleted} ${node.key}: ${stringify(node.value, depth)}\n`;
        case 'changed':
          return `${indent(depth)}${sign.deleted} ${node.key}: ${stringify(node.value.before, depth)}\n${indent(depth)}${sign.added} ${node.key}: ${stringify(node.value.after, depth)}\n`;
        case 'unchange':
          return `${indent(depth)}${sign.unchange} ${node.key}: ${stringify(node.value, depth)}\n`;
        case 'nested':
          return `${indent(depth)}  ${node.key}: {\n${iter(node.value, depth + 1).join('')}${indent(depth)}  }\n`;
        default:
          throw new Error('Unknown type');
      }
    });

    return result;
  };

  return `{\n${iter(tree, 1).join('')}}`;
};

export default stylish;
