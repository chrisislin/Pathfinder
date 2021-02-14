import React, { useState, useContext, useEffect } from 'react';
import { Context } from 'Provider';
import { 
  INITIAL_COLOR, VISIT_COLOR, KEYS, FIXED_COLOR,
  ITEM_INITIAL, ITEM_VISITED, ITEM_CLICKED, CLICK_COLOR, ITEM_SHORTEST, SHORT_COLOR
} from 'constants.js';
import './Item.scss';

const Item = ({ ridx, cidx }) => {

  const [type, setType] = useState(ITEM_INITIAL);
  const { setItemCache, begin, end, pathFinder } = useContext(Context);

  setItemCache.current[KEYS[ridx][cidx]] = setType;

  useEffect(() => {
    if ((type === ITEM_VISITED) && (ridx === end.x && cidx === end.y)) {
      pathFinder.current.paintShortestPath();
    }
  }, [type, end, pathFinder, ridx, cidx]);

  useEffect(() => {
    if ((type === ITEM_SHORTEST) && (ridx === end.x && cidx === end.y)) {
      pathFinder.current.clearTimers();
    }
  }, [type, end, pathFinder, ridx, cidx]);

  const getColor = () => {
    if ((ridx === begin.x && cidx === begin.y) || (ridx === end.x && cidx === end.y)) {
      return FIXED_COLOR;
    } else if (type === ITEM_VISITED) {
      return VISIT_COLOR;
    } else if (type === ITEM_CLICKED) {
      return CLICK_COLOR;
    } else if (type === ITEM_SHORTEST) {
      return SHORT_COLOR;
    }
    return INITIAL_COLOR;
  };

  return (
    <div
      className="board__item"
      data-ridx={ridx}
      data-cidx={cidx}
      style ={{
        backgroundColor: getColor()
      }}
    />
  )
};

export default Item; 