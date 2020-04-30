//Exports our random maze
export default function RandomMaze(grid) {
    const [startNode, finishNode] = grid
      .reduce((a, b) => a.concat(b))
      .filter(node => node.isStart || node.isFinish);
    const path = getRandomPath(grid, startNode, finishNode);
    const newGrid = addRandomWalls(grid, path, startNode, finishNode);
    return newGrid;
  }
  
  const addRandomWalls = (grid, path, startNode, finishNode) => {
    for (const row of grid) {
      for (const node of row) {
        if (path.includes(node) || node === startNode || node === finishNode)
          continue;
        
        const addWall = Math.floor(Math.random() * 10);
        if (addWall < 5) {
          node.isWall = true;
        }
      }
    }
    return grid;
  };
  
  const getRandomPath = (options, startNode, finishNode) => {
    const pathFirst = [];
    const pathLast = [];
    let randomNum = Math.floor(
      Math.random() * (options.reduce((a, b) => a.concat(b)).length / 2) + 10,
    );
    let first = pickRandomNeighbor(options, startNode);
    let last = pickRandomNeighbor(options, finishNode);
    pathFirst.push(first);
    pathLast.push(last);
    for (randomNum; randomNum >= 0; --randomNum) {
      const f = pickRandomNeighbor(options, pathFirst[pathFirst.length - 1]);
      const l = pickRandomNeighbor(options, pathLast[pathLast.length - 1]);
      pathFirst.push(f);
      pathLast.push(l);
      options = options.filter(node => node !== f && node !== l);
    }
    return pathFirst.concat(pathLast);
  };
  
  const pickRandomNeighbor = (options, node) => {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(options[row - 1][col]);
    if (row < options.length - 1) neighbors.push(options[row + 1][col]);
    if (col > 0) neighbors.push(options[row][col - 1]);
    if (col < options[0].length - 1) neighbors.push(options[row][col + 1]);
    const neighborNum = Math.floor(Math.random() * (neighbors.length - 1));
    return neighbors[neighborNum];
  };