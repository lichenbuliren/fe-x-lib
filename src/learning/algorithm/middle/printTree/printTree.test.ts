import { test } from 'vitest';
import { getColumnsByDepth, traverse, TreeNode } from './printTree';

test('get tree depth1', () => {
  const leftNode = new TreeNode(2);
  const rightNode = new TreeNode(3);

  const rootTree = new TreeNode(1, leftNode, rightNode);

  expect(traverse(rootTree)).toBe(1);
});

test('get tree depth2', () => {
  const leftNode = new TreeNode(2, new TreeNode(4));
  const rightNode = new TreeNode(3);

  const rootTree = new TreeNode(1, leftNode, rightNode);

  const treeDepth = traverse(rootTree);
  expect(treeDepth).toBe(2);
  expect(getColumnsByDepth(treeDepth)).toBe(7);
});

// test('collect by tree', () => {
//   const leftNode = new TreeNode(2, new TreeNode(4));
//   const rightNode = new TreeNode(3);

//   const rootTree = new TreeNode(1, leftNode, rightNode);
//   const result = printTree(rootTree);
//   expect(result.length).toBe(2);
//   expect(result[0].length).toBe(7);
// });
