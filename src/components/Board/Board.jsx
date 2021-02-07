import React, { useContext } from 'react';
import { Context } from 'Provider';
import './Board.scss';

const Board = () => {
  const context = useContext(Context);
  const { board } = context;

  return (
    <div className="board">
      {board.map((row, ridx) => (
        <div className="board_row" key={ridx} style={{ display: 'flex', justifyContent: 'center' }}>
          {row.map((col, cidx) => {
            return (
            <div className="board_col" key={2 * ridx + cidx} style={{
              backgroundColor: (board[ridx][cidx].color || null)
            }} />
            )
          })}
          <br />
        </div>
      ))}
    </div>
  );
};

export default Board;
