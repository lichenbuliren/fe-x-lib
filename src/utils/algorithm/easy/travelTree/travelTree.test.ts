import { test, expect } from 'vitest';
import { travelTree } from './travelTree';

interface Tree {
  [x: string]: string[];
}
test('test travelTree', () => {
  const tree: Tree = {
    A: ['C', 'D'],
    B: ['A'],
    C: ['F'],
    D: ['E'],
  };

  expect(travelTree(tree)).toEqual(['B', 'A', 'C', 'F', 'D', 'E']);

  const tree2: Tree = {
    A: ['B', 'C', 'D'],
    B: ['E', 'F'],
    C: ['G', 'H'],
    D: ['I', 'J', 'K'],
    L: ['M', 'N'],
    M: ['A'],
  };

  expect(travelTree(tree2)).toEqual(['M', 'A', 'B', 'E', 'F', 'C', 'G', 'H', 'D', 'I', 'J', 'K', 'L', 'N']);
});
