import React, { useState, useRef } from 'react';
import PriorityQueue from 'js-priority-queue';

function App() {
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));

  const dist = new Array(10);
  for (let i = 0; i < 10; i++) dist[i] = new Array(10).fill(Infinity);

  const row = [-1, 1, 0, 0];
  const col = [0, 0, -1, 1];

  const begin = { row: 7, col: 2 };
  dist[7][2] = 0;

  const onButtonClick = () => {
    const temp = JSON.parse(JSON.stringify(board));
    const q = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
    q.queue({ x: begin.row, y: begin.col, d: 0 })

    while (q.length) {
      const current = q.peek(); q.dequeue();
      const x = current.x, y = current.y, d = current.d
      console.log(dist);

      if (d > dist[x][y]) continue;

      for (let i = 0; i < 4; i++) {
        const dx = x + row[i];
        const dy = y + col[i];
        if (dx < 0 || dx >= 10 || dy < 0 || dy >= 10) continue;
        if (dist[dx][dy] + 1 >= dist[dx][dy]) continue;
        temp[dx][dy] = 'yellow';
        dist[dx][dy] = dist[x][y] + 1;
        q.queue({ x: dx, y: dy, d: dist[dx][dy] });
      }
      const copy = JSON.parse(JSON.stringify(temp));
      setTimeout(() => { setBoard(copy) }, 1000 * d);
    }
  };

  return (
    <>
      {board.map((row, ridx) => (
        <div key={ridx} style={{ display: 'flex' }}>
          {row.map((col, cidx) => {
            const bg = (begin.row === ridx && begin.col === cidx ? 'black' : null);
            const color = board[ridx][cidx];
            return <div key={cidx + color} style={{
              width: '64px',
              height: '64px',
              border: '1px solid black',
              backgroundColor: (bg || color)
            }}></div>
          })}
          <br />
        </div>
      ))}
      <button onClick={onButtonClick}>yo it's Kanye</button>
    </>
  );
};

export default App;
