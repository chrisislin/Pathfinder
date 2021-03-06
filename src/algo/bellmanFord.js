// @flow

import {
  BOARD_ROW,
  BOARD_COL,
  VISIT_COLOR,
  CLICK_COLOR,
} from 'constants.js';
import PathFinder from './pathFinder';

export default class BellmanFord extends PathFinder {

  execute = () : boolean => {
    const { copy, _relax } = this;
    let timeFactor = 1, find = false;
    for(let i=1; i<=copy.length-1; i++) {
      const relaxedResult = _relax(timeFactor);
      timeFactor = relaxedResult.timeFactor;
      timeFactor++;
      if (relaxedResult.find) find = true;
    }
    copy[this.end.x][this.end.y].visit = true;
    this.updateBoard(timeFactor);
    return find;
  }

  _relax = (timeFactor : number) : {| timeFactor: number, find: boolean|} => {
    const { copy, dist, prev, end } = this;
    let find = false;
    for(let i=0; i<BOARD_ROW; i++){
      for(let j=0; j<BOARD_COL; j++){

        let isUpdated = false;
        for(let k=0; k<PathFinder.row.length; k++){
          const nextX = i + PathFinder.row[k];
          const nextY = j + PathFinder.col[k];

          if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
          if (dist[i][j] === Infinity || dist[i][j] + 1 >= dist[nextX][nextY]) continue;
          if (copy[nextX][nextY].color === CLICK_COLOR) continue;

          dist[nextX][nextY] = dist[i][j] + 1;
          if (!(nextX === end.x && nextY === end.y)) {
            copy[nextX][nextY].color = VISIT_COLOR;
            copy[nextX][nextY].visit = true;
          } else {
            find = true;
          }
          prev[nextX][nextY] = { x: i, y: j };
          isUpdated = true;
        }
        if (isUpdated) {
          this.updateBoard(timeFactor);
          timeFactor++;
        }
      }
    }
    return { timeFactor, find };
  }

  
}