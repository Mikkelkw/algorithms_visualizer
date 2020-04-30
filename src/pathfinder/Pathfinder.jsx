import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {astar} from '../algorithms/astar';
import {dfs, getNodesInShortestPathOrderDfs} from '../algorithms/dfs';
import {bfs} from '../algorithms/bfs';
import RandomMaze from '../algorithms/RandomMaze';
import AlgorithmController from 'C:/Users/i5/Documents/School/Senior project/algorithms_visualizer/src/algorithms/Algorithmcontroller.js';
import './Pathfinder.css';

var startNodeRow = 10;
var startNodeCol = 15;
var finishNodeRow = 10;
var finishNodeCol = 35;
var timeouts = [];
const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLS = 50;

//our component that displayes pathfinding
export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      finishSelected:false,
      mouseIsPressed:false,
      finishSelected:false,
      ranAlgorithm: false,
      selectedAlgorithm: 0,
      amountVisited: 0,
      grid: [],
      mouseIsPressed: false,
      distance:0,
      text:""
    };
  }
  setAlgorithm(selectedAlgorithm){
    this.setState({selectedAlgorithm})
  }
  


  
  //standard react function to prevent re-rendering of board
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid})
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err))

  }
  //used to make sure we have a connection to our backend server
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  //makes sure we can move our start and updates nodes to be our new start
  handleStartChanged(row, col) {
    const prevStartNodeRow = startNodeRow;
    const prevStartNodeCol = startNodeCol;
    const {grid} = this.state;
    if (grid[row][col].isWall)
        return;

    startNodeRow = row;
    startNodeCol = col;

    grid[prevStartNodeRow][prevStartNodeCol].isStart = false;
    grid[startNodeRow][startNodeCol].isStart = true;


    this.setState({grid: grid});

    //used to instantly change our grid if we start
    if (this.state.ranAlgorithm) {
      this.visualizeInstantAlgorithm();
  }
}
//makes sure we can move our finish and updates nodes to be our new finish
handleFinishChanged(row, col) {
  const prevFinishNodeRow = finishNodeRow;
  const prevFinishNodeCol = finishNodeCol;
  const {grid} = this.state;
  if (grid[row][col].isWall)
      return;
  finishNodeRow = row;
  finishNodeCol = col;


  grid[prevFinishNodeRow][prevFinishNodeCol].isFinish = false;
  grid[finishNodeRow][finishNodeCol].isFinish = true;

  this.setState({grid: grid});
  //used to instantly change our grid if we finish
  if (this.state.ranAlgorithm) {
    this.visualizeInstantAlgorithm();
}

}


  //click, hold down and release handelers
  handleMouseDown(row, col) {
    if (startNodeCol === col && startNodeRow === row) {
      this.setState({startSelected: true, mouseIsPressed: true});
      return;
  }
  if (finishNodeCol === col && finishNodeRow === row) {
      this.setState({finishSelected: true, mouseIsPressed: true});
      return;
  }
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
    if (this.state.ranAlgorithm)
      this.visualizeInstantAlgorithm();
  }


  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    const {grid, ranAlgorithm} = this.state;

    if (this.state.startSelected) {
        this.handleStartChanged(row, col);
        return;
    }

    if (this.state.finishSelected) {
        this.handleFinishChanged(row, col);
        return;
    }

    // Make sure that we dont put a wall over the start or finish node
    if (!(row === startNodeRow && col === startNodeCol) && !(row === finishNodeRow && col === finishNodeCol)) {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        this.setState({grid: newGrid});

        if (this.state.ranAlgorithm) {
          this.visualizeInstantAlgorithm();
      }
    }
}
  handleMouseUp() {
    this.setState({mouseIsPressed: false, startSelected: false, finishSelected: false});
  }

  //clears stored animations that has not happened yet
  cleartimeouts(){
    for (var i=0; i<timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
  }
//animates our chosen algorithm
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    this.cleartimeouts();
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        timeouts.push(setTimeout(() => {
          this.animateShortes(nodesInShortestPathOrder);
        }, 10 * i));
        return;
      }
      timeouts.push(setTimeout(() => {
        var node = visitedNodesInOrder[i];
        document.getElementById(`node-${startNodeRow}-${startNodeCol}`).className =
        'node node-start';
        document.getElementById(`node-${finishNodeRow}-${finishNodeCol}`).className =
        'node node-finish';
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i));
      
    }
  }
  //clears our entire board (paths and walls)
  clearBoard(){
    this.setHeader("");
    this.cleartimeouts();
    for (let r = 0; r <= 19; r++) {
      for (let c = 0; c <= 49; c++) {
        timeouts.push(setTimeout(() => {
      
        document.getElementById(`node-${r}-${c}`).className =
          'node node-not-visited';
        if (r === startNodeRow && c === startNodeCol){
          document.getElementById(`node-${r}-${c}`).className =
          'node node-start';
        }
        if (r === finishNodeRow && c === finishNodeCol){
          document.getElementById(`node-${r}-${c}`).className =
          'node node-finish';
        }
      }, 10 * r));
    }
  }
  const grid = getInitialGrid();
  const ranAlgorithm = false;
  this.setState({grid, ranAlgorithm});
  this.clearGridAndTimers(grid);
}

//clears both board and animations already queued
clearGridAndTimers(grid){
  this.cleartimeouts();
  clearGrid(grid);
}
   //animates our shortest path 
  animateShortes(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      timeouts.push(setTimeout(() => {
        const node = nodesInShortestPathOrder[i];

          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
          document.getElementById(`node-${startNodeRow}-${startNodeCol}`).className =
          'node node-start';
          document.getElementById(`node-${finishNodeRow}-${finishNodeCol}`).className =
          'node node-finish';
        
      }, 50 * i));
    }
    
  }

  //gets and visualizes our dijkstra
  visualizeDijkstra() {
    
    if(this.state.ranAlgorithm){
      this.clearGrid();
    }
    this.setAlgorithm(0);
    this.cleartimeouts();
    this.setHeader("Dijkstra's algorithm creates a tree of shortest paths from the starting vertex, the source, to all other points in the graph. It's runtime is O(|V|+|E| log |V|) (where |V|is the number of nodes and |E| is the number of edges). It always finds the shortest path");
    const {grid} = this.state;
    
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    const visited = visitedNodesInOrder.length + 1
    this.setState({ranAlgorithm: true, selectedAlgorithm:0, distance: finishNode.distance, amountVisited: visited})
  }

  //gets and visualizes our astar
  visualizeAstar(){
    if(this.state.ranAlgorithm){
      this.clearGrid();
    }
    this.cleartimeouts();
    this.setHeader("A* Search algorithm is one of the best and most popular techniques used in path-finding and graph traversals. It uses a heuristic to estimate shortest path when searching. \
    worst case time complexity is O(E), where E is the number of edges in the graph. This search method always finds the shortest path")
    const {grid} = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    const visited = visitedNodesInOrder.length + 1
    this.setState({ranAlgorithm: true, selectedAlgorithm:1, distance: finishNode.distance, amountVisited: visited})
  }

  //gets and visualizes our depthfirst search
  visualizedfs(){
    if(this.state.ranAlgorithm){
      this.clearGrid();
    }
    this.setAlgorithm(2);
    this.cleartimeouts();
    this.setHeader("Depth-first search starts at the root node (selecting the start node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. It's time complexity is O(|V| + |E|) and it does not guarantee the fastest route")
    const {grid} = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDfs(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    const visited = visitedNodesInOrder.length + 1
    this.setState({ranAlgorithm: true, selectedAlgorithm:2, distance: finishNode.distance, amountVisited: visited})
  }

  //gets and visualizes our breath first search
  visualizebfs(){
    if(this.state.ranAlgorithm){
      this.clearGrid();
    }
    this.setAlgorithm(3);
    this.cleartimeouts();
    this.setHeader("Breath first search is a traversing algorithm where you should start traversing from a starting node and traverse the graph layerwise thus exploring the neighbour nodes (nodes which are directly connected to source node). You must then move towards the next-level neighbour nodes. The time complexity can be expressed as O(|V|+|E|) and it always finds the shortest path")
    const {grid} = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    const visited = visitedNodesInOrder.length + 1
    this.setState({ranAlgorithm: true, selectedAlgorithm:3, distance: finishNode.distance, amountVisited: visited})
  }

  //genereates a random maze
  generateMaze() {
    
    this.clearBoard();
    setTimeout(() => {
      this.setHeader("This is a randomly generated maze")
      const f = RandomMaze(getInitialGrid());
    this.setState({grid: f});
    }, 200);
    
    
  }
  //sets our header/info section
  setHeader(text){
    this.setState({text})
  }

  //used when algorithm is ran and we move something on the grid for instant effect
  animateInstantAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            this.animateInstantShortestPath(nodesInShortestPathOrder);
            return;
        }
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
            'node visitedInstant';

    }
}
 //used when algorithm is ran and we move something on the grid for instant shortest path discovery
animateInstantShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-instant-shortest-path';
    }
}

 //used when algorithm is ran and we move something on the grid for instant nodes visited
visualizeInstantAlgorithm() {
  const {grid, selectedAlgorithm} = this.state;
  this.clearGridAndTimers(grid);
  const newGrid = resetGrid(grid);

  const startNode = newGrid[startNodeRow][startNodeCol];
  
  const finishNode = newGrid[finishNodeRow][finishNodeCol];
  const visitedNodesInOrder = AlgorithmController.runAlgorithm(newGrid, startNode, finishNode, selectedAlgorithm);
  
  if(this.state.selectedAlgorithm == 2){
    var nodesInShortestPathOrder = getNodesInShortestPathOrderDfs(finishNode)
  }else{
    var nodesInShortestPathOrder = AlgorithmController.getNodesInShortestPathOrder(finishNode);
  }
  this.animateInstantAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  const visited = visitedNodesInOrder.length + 1
  this.setState({distance: finishNode.distance, amountVisited: visited});
}

 //clears our grid but not walls
clearGrid(){
  this.cleartimeouts();
  var grid = this.state.grid;
  var newGrid=[]
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    for (let col = 0; col < NUMBER_OF_COLS; col++) {
        let className = 'node';

        if (row === startNodeRow && col === startNodeCol)
            className = 'node node-start';

        if (row === finishNodeRow && col === finishNodeCol)
            className = 'node node-finish';

        if (grid[row][col].isWall) {
            className = 'node node-wall';
        }


        document.getElementById(`node-${row}-${col}`).className =
            className;
    }
}


this.setState({ranAlgorithm: false, grid: grid, selectedAlgorithm:0})
}



  render() {
    const {grid, mouseIsPressed} = this.state;
 
    //our html tags interacted upon by react functions
    return ( 
      
      <>
      <div id="pathfind">
        <div id="buttonContainter">
        <button id="pathfindButton" onClick={() => this.visualizeDijkstra()}>
          Dijkstra's Algorithm
        </button>
        <button id="pathfindButton" onClick={() => this.visualizeAstar()}>
          Astar
        </button>
        <button id="pathfindButton" onClick={() => this.visualizedfs()}>
          Depth First Search
        </button>
        <button id="pathfindButton" onClick={() => this.visualizebfs()}>
          Breath First Search
        </button>
        <button id="pathfindButton" className="resetButton" onClick={() => {this.clearBoard(); this.generateMaze()}}>
          Random Maze
        </button>
        <button id="pathfindButton" className="resetButton" onClick={() => {this.clearGrid();}}>
          Clear current path
        </button>
        
        
        <button id="pathfindButton" onClick={() => this.clearBoard()
        }>
          Clear Board
        </button>

        <button id="pathfindButton" onClick={() => window.location.reload(false)}>Log out</button>
        </div>
        <div id="TextContainter"><h2>{this.state.text}</h2></div>
        <div id="distance"><h2>Distance = {this.state.distance}. Nodes Visited = {this.state.amountVisited}</h2></div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall, isVisited} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isVisited={isVisited}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
      </>
      
    );
  }
}

//start grid
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUMBER_OF_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
//creates the nodes
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

//gets our grid if we toggle war
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

//a reset grid 
const resetGrid = grid => {
  const newGrid = grid.slice();
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      for (let col = 0; col < NUMBER_OF_COLS; col++) {
          newGrid[row][col].distance = Infinity;
          newGrid[row][col].fScore = Infinity;
          newGrid[row][col].previousNode = null;
          newGrid[row][col].isVisited = false;
      }
  }

  return newGrid;
};

//our clear grid
const clearGrid = grid => {
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      for (let col = 0; col < NUMBER_OF_COLS; col++) {
          let className = 'node';

          if (row === startNodeRow && col === startNodeCol)
              className = 'node node-start';

          if (row === finishNodeRow && col === finishNodeCol)
              className = 'node node-finish';

          if (grid[row][col].isWall) {
              className = 'node node-wall';
          }


          document.getElementById(`node-${row}-${col}`).className =
              className;
      }
  }
};

