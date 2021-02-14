// @flow

import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-modal';
import Header from '../Header/Header';
import Board from '../Board/Board';
import ModalInfo from '../Info/Info';
import { Context } from 'Provider';
import './Container.scss';

Modal.setAppElement('#root');

const Container = () => {

  type ContextType = {
    isPathExist: boolean,
    pathFinder: typeof React.useRef,
    clear: (void) => void
  };

  const context = useContext(Context);
  const { isPathExist, pathFinder, clear, isHelped, setIsHelped } : ContextType = context;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isPathExist) {
      clear();
      pathFinder.current.clearTimers();
      setIsOpen(true);
    }
  }, [isPathExist, pathFinder, clear]);

  const onClose = () => { setIsOpen(false); };
  const onHelpClose = () => {
    setIsHelped(false);
  };
  
  return (
    <>
      <header className="header">
        <h1 className="header__title">Pathfinding Visualizer</h1>
      </header>
      <ModalInfo isHelped={isHelped} onHelpClose={onHelpClose} />
      <Modal
        className="modal"
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={onClose}
      >
        <h1 className="modal__title">Error!</h1>
        <p className="modal__content">Cannot find path to the goal</p>
        <button onClick={onClose} className="modal__close">X</button>
      </Modal>
      <Header />
      <Board />
      <footer className="footer">
        <p className="footer__author"></p>
      </footer>
    </>
  );
};
export default Container;