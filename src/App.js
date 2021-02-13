import React from 'react';
import Container from './components/Container/Container';
import { Provider } from 'Provider';

const App = () => {
  return (
    <Provider>
      <Container />
    </Provider>
  );
};

export default App;
