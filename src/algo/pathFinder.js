import { BOARD_ROW, BOARD_COL, VISIT_COLOR, SHORT_COLOR } from 'constants.js';

export default class PathFinder {
  constructor({ begin, end, board, setState, delay }) {
    this._init();
    this.begin = begin;
    this.end = end;
    this.copy = JSON.parse(JSON.stringify(board));
    this.setState = setState;
    this.delay = delay;
    this.row = [-1, 1, 0, 0];
    this.col = [0, 0, -1, 1];
    this.timers = []
  }

  clear(newBoard) {
    this.copy = JSON.parse(JSON.stringify(newBoard));
    this._init();
  }
  _init() {
    this.dist = new Array(BOARD_ROW);
    this.prev = new Array(BOARD_ROW);

    for (let i = 0; i < BOARD_ROW; i++) {
      this.dist[i] = [];
      this.prev[i] = [];

      for (let j = 0; j < BOARD_COL; j++) {
        this.dist[i][j] = Infinity;
        this.prev[i][j] = { x: -1, y: -1 };
      }
    }
  }

  clearTimers() {
    this.timers.forEach((timer) => { clearTimeout(timer); })
    this.timers = [];
  }

  paintShortestPath() {
    this.copy[this.end.x][this.end.y].visit = false;
    const path = [];
    let x = this.end.x;
    let y = this.end.y;

    while (this.prev[x][y].x !== -1 && this.prev[x][y].y !== -1) {
      path.push({ x, y });
      const tempX = x, tempY = y;
      x = this.prev[tempX][tempY].x;
      y = this.prev[tempX][tempY].y;
    }
    path.push({ x: this.begin.x, y: this.begin.y });

    for (let i = path.length - 1; i >= 0; i--) {
      x = path[i].x;
      y = path[i].y;
      this.copy[x][y].color = SHORT_COLOR;
      const temp = JSON.parse(JSON.stringify(this.copy));
      const timer = setTimeout(() => { this.setState(temp) }, this.delay * (path.length - i));
      this.timers.push(timer);
    }

  }
}
