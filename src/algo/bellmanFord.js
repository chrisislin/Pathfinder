import { BOARD_ROW, BOARD_COL, VISIT_COLOR } from 'constants.js';
import PathFinder from './pathFinder';

export default class BellmanFord extends PathFinder {
  constructor({begin, end, board, setState, delay}){
    super({begin, end, board, setState, delay});
    this.empty = JSON.parse(JSON.stringify(board));
  }

  _relax(timeFactor) {
    const copy = this.copy;
    const dist = this.dist;
    const prev = this.prev;
    for(let i=0; i<BOARD_ROW; i++){
      for(let j=0; j<BOARD_COL; j++){
        let isUpdated = false;
        for(let k=0; k<4; k++){
          const nextX = i + this.row[k];
          const nextY = j + this.col[k];
          if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
          if (dist[i][j] === Infinity || dist[i][j] + 1 >= dist[nextX][nextY]) continue;

          dist[nextX][nextY] = dist[i][j] + 1;
          if (!(nextX === this.end.x && nextY === this.end.y)) {
            copy[nextX][nextY].color = VISIT_COLOR;
            copy[nextX][nextY].visit = true;
          }
          prev[nextX][nextY] = { x: i, y: j };
          isUpdated = true;
        }
        if (isUpdated) {
          const temp = JSON.parse(JSON.stringify(copy));
          setTimeout(() => { this.setState(temp) }, this.delay*timeFactor);
          timeFactor++;
        }
      }
    }
    return timeFactor;
  }

  execute() {
    this.dist[this.begin.x][this.begin.y] = 0;
    let timeFactor = 1;
    for(let i=1; i<=this.copy.length-1; i++) {
      timeFactor = this._relax(timeFactor);
      timeFactor++;
    }
    this.copy[this.end.x][this.end.y].visit = true;
    setTimeout(() => { this.setState(this.copy) }, this.delay*timeFactor);
  }
} 