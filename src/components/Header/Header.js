import React, { useState, useContext, useEffect } from 'react';
import { DIJKSTRA, BELLMAN_FORD, SHORT_COLOR } from 'constants.js';
import { Context } from 'Provider';
import PathFinder from 'algo/index.js';
import './Header.scss';
import { clear } from 'sisteransi';

const Header = () => {
  const [type, setType] = useState(DIJKSTRA);
  const [delay, setDelay] = useState(300);
  const context = useContext(Context);
  const { begin, end, board, setBoard, pathFinder, clear } = context;

  const onSelectChange = (e) => {
    setType(e.target.value);
  };

  const onDelayChange = (e) => {
    setDelay(e.target.value);
  };


  const onVisualize = (_e) => {
    pathFinder.current = new PathFinder[type]({
      begin,
      end,
      board,
      setState: setBoard,
      delay
    });
    pathFinder.current.execute();
  };

  const onClear = () => {
    clear();
  };

  useEffect(() => {
    if (board[end.x][end.y].visit) {
      pathFinder.current.paintShortestPath();
    }
  }, [board, pathFinder, end]);

  useEffect(() => {
    if (board[end.x][end.y].color === SHORT_COLOR) {
      pathFinder.current.clearTimers();
    }
  }, [board, pathFinder, end]);

  return (
    <header className="header">
      <select className="header_select" onChange={onSelectChange}>>
        <option value={DIJKSTRA} defaultChecked={true}>Dijkstra</option>
        <option value={BELLMAN_FORD}>Bellman-Ford</option>
      </select>
      <select className="header_select" onChange={onDelayChange} defaultValue={300}>
        <option value={550}>slowest</option>
        <option value={450}>slowest</option>
        <option value={300}>default</option>
        <option value={150}>fast</option>
        <option value={50}>fastest</option>
      </select>
      <button className="header_button" onClick={onVisualize}>
        Visualize this
      </button>
      <button className="header_button" onClick={onClear}>
        Clear
      </button>
    </header>
  );
};

export default Header;
