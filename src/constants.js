

export const BOARD_ROW = 16;
export const BOARD_COL = 30;
export const VISIT_COLOR = 'deepskyblue';
export const SHORT_COLOR = 'red';
export const FIXED_COLOR = 'black';
export const INITIAL_COLOR = 'silver';
export const CLICK_COLOR = 'gray';


export const DIJKSTRA = 'dijkstra';
export const BELLMAN_FORD = 'bellman_ford';
export const A_STAR = 'a-star';

// Board
export const BOARD = [];
for(let i=0; i<BOARD_ROW; i++){
  BOARD[i] = [];
  for(let j=0; j<BOARD_COL; j++){
    BOARD[i][j] = {
      color: INITIAL_COLOR,
      visit: false
    };
  }
}