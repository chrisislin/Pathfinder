import PriorityQueue from 'js-priority-queue';
import {BOARD_ROW, BOARD_COL, VISIT_COLOR, SHORT_COLOR} from '../constants';

const row = [-1, 1, 0, 0];
const col = [0, 0, -1, 1];

export default class Dijkstra{
  constructor({begin, end, board, setState, delay}){
    this.begin = begin;
    this.end = end;
    this.pq = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
    this.dist = new Array(BOARD_ROW);
    this.prev=new Array(BOARD_ROW);

    for(let i=0; i<BOARD_ROW; i++){
      this.dist[i] = [];
      this.prev[i] = [];

      for(let j=0; j<BOARD_COL; j++){
        this.dist[i][j] = Infinity;
        this.prev[i][j] = { x: -1, y: -1 };
      }
    }
    this.copy = JSON.parse(JSON.stringify(board));
    this.setState = setState;
    this.delay = delay;
  }

  execute(){
    console.log('Hey')
  }

  paintShortestPath(){
    
  }
}
