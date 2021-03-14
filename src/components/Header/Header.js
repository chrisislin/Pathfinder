import React, { useState, useContext, useEffect } from 'react';
import { DIJKSTRA, BELLMAN_FORD, SHORT_COLOR, A_STAR, DFS, BFS } from 'constants.js';
import { Context } from 'Provider';
import PathFinder from 'algo/index.js';
import { FaPause, FaPlay } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
  const [type, setType] = useState(DIJKSTRA);
  const [pause, setPause] = useState(false);
  const [delay, setDelay] = useState(300);
  const context = useContext(Context);
  const { begin, end, board, setBoard, pathFinder, clear, isVisualized } = context;

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
    if (isVisualized && !pause) return;
    if (pause) setPause(false);
  };

  const onPause = () => {
    if (pause) {
      setPause(false);
      pathFinder.current.resumeTimers();
    } else {
      setPause(true);
      pathFinder.current.stopTimers();
    }
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
      <select className="header_select" onChange={onSelectChange} disabled={isVisualized}>
        <option value={DIJKSTRA} defaultChecked={true}>Dijkstra</option>
        <option value={A_STAR}>A Star</option>
        <option value={DFS}>DFS</option>
      </select>
      <select className="header_select" onChange={onDelayChange} defaultValue={300} disabled={isVisualized}>
        <option value={550}>slowest</option>
        <option value={450}>slow</option>
        <option value={300}>default</option>
        <option value={150}>fast</option>
        <option value={50}>fastest</option>
      </select>
      <button className="header_button" onClick={onVisualize}>
        Visualize this
      </button>
      <button className="header_button" onClick={onClear} >
        Clear
      </button>
    </header>
  );
};

export default Header;
