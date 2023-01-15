#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description(' Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();