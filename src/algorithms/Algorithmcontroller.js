import {dijkstra} from '../algorithms/dijkstra';
import {astar} from '../algorithms/astar';
import {dfs} from '../algorithms/dfs';
import {bfs} from '../algorithms/bfs';
export default class AlgorithmController {

    static runAlgorithm(grid, startNode, finishNode, algorithm){
        switch(algorithm){
            case 0:
               return new dijkstra(grid, startNode, finishNode);

            case 1:
                return astar(grid, startNode, finishNode);
            
            case 2:
                return dfs(grid, startNode, finishNode);
         

            case 3:
                return new bfs(grid, startNode, finishNode);

            default:
                break;
        }

    }

    static getNodesInShortestPathOrder(finishNode) {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return nodesInShortestPathOrder;
    }

}