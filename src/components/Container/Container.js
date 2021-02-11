import React from 'react';
import Header from '../Header/Header';
import Board from '../Board/Board';
import { Provider } from 'Provider';
import './Container.scss';

const Container = () => {

  return (
    <>
      <header className="header">
        <h1 className="header_title">Pathfinder</h1>
      </header>
      <Provider>
        <Header />
        <Board />
      </Provider>
    </>
  );
};

export default Container;
