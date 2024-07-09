export class TreeNode {
  val: number;

  left: TreeNode | null;

  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function traverse(rootNode: TreeNode | null) {
  let depth = 0;
  function dfs(node: TreeNode | null, level = 0) {
    if (!node) return;
    depth = Math.max(depth, level);
    dfs(node.left, level + 1);
    dfs(node.left, level + 1);
  }

  dfs(rootNode);
  return depth;
}

export function getColumnsByDepth(depth: number) {
  return 2 ** (depth + 1) - 1;
}

export function generlCollection(depth: number) {
  const result: string[][] = [];
  for (let i = 0; i < depth; i += 1) {
    const row = new Array(getColumnsByDepth(depth)).fill('');
    result.push(row);
  }

  return result;
}

export function dfs2(
  node: TreeNode | null,
  params: {
    depth: number;
    result: string[][];
    level: number;
    column: number;
  },
) {
  if (!node) return;
  const { result, level, column, depth } = params;
  result[level][column] = `${node.val}`;
  console.log('result', result);
  console.log('level, column, depth', level, column, depth);
  const leftNodeIndex = column - 2 ** (depth - level - 1);
  dfs2(node.left, {
    depth,
    result,
    level: level + 1,
    column: leftNodeIndex,
  });

  const rightNodeIndex = column + 2 ** (depth - level - 1);
  dfs2(node.right, {
    depth,
    result,
    level: level + 1,
    column: rightNodeIndex,
  });
}

export function printTree(root: TreeNode | null) {
  const depth = traverse(root);

  const collect = generlCollection(depth);

  dfs2(root, {
    depth,
    result: collect,
    level: 0,
    column: (getColumnsByDepth(depth) - 1) / 2,
  });

  return collect;
}
