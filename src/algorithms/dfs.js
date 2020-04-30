//exports our dfs algorithm
export function dfs(grid,startNode,finishNode){
    let visitedNodesInOrder=[];
    for (const row of grid) {
        for (const node of row) {
          node.isVisited=false;
          startNode.distance = 0
        }
      }
    dfs1(grid,startNode,finishNode,visitedNodesInOrder);
    return visitedNodesInOrder;
}

function dfs1(grid,node,finishNode,visitedNodesInOrder){
    
    if(node===finishNode) return true;
    if(node.isVisited) return false;
    if(node.isWall) return false;
    node.isVisited=true;
    
    const {col, row} = node;
    if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall){
        grid[row - 1][col].previousNode=node;
        visitedNodesInOrder.push(grid[row - 1][col]);
        if(dfs1(grid,grid[row - 1][col],finishNode,visitedNodesInOrder)) return true;
    }
    if (row < grid.length - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall){

        grid[row + 1][col].previousNode=node;
        visitedNodesInOrder.push(grid[row + 1][col]);
        if(dfs1(grid,grid[row + 1][col],finishNode,visitedNodesInOrder)) return true;
    }
    if (col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall){
        grid[row ][col - 1].previousNode=node;
        visitedNodesInOrder.push(grid[row][col - 1]);
        if(dfs1(grid,grid[row][col - 1],finishNode,visitedNodesInOrder)) return true;
    }
    if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited && !grid[row][col + 1].isWall){
        grid[row ][col + 1].previousNode=node;
        visitedNodesInOrder.push(grid[row][col + 1]);
        if(dfs1(grid,grid[row][col + 1],finishNode,visitedNodesInOrder)) return true;
    }
    return false;
}

  export function getNodesInShortestPathOrderDfs(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    var i = 0;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
      i+=1
    }
    
    finishNode.distance = i -1
    
    return nodesInShortestPathOrder;
  }