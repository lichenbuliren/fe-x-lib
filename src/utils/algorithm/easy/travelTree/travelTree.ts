export function travelTree(tree: { [x: string]: string[] }): string[] {
  const result: string[] = [];
  // 用来记录是否已经遍历过节点
  const visited: { [x: string]: boolean } = {};

  // 深度优先遍历，总是从叶子节点左侧递归遍历
  const dfs = (node: string) => {
    if (visited[node]) {
      return;
    }
    visited[node] = true;

    const deps = tree[node];
    // 没有依赖，当前节点可直接入栈
    if (!deps) {
      result.push(node);
      return;
    }

    // 如果有依赖，需要判断当前节点的 left 节点也就是 deps[0] 是否已经在数组内了，
    // 如果是则代表当前节点为父节点，需要插入到对应的位置
    const leftDepsIndexInResult = result.findIndex((item) => item === deps[0]);
    if (leftDepsIndexInResult >= 0) {
      result.splice(leftDepsIndexInResult, 0, node);
    } else {
      result.push(node);
    }

    for (let i = 0; i < deps.length; i += 1) {
      dfs(deps[i]);
    }
  };

  const nodes = Object.keys(tree);
  for (let i = 0; i < nodes.length; i += 1) {
    dfs(nodes[i]);
  }

  console.log('result', result);
  return result;
}
