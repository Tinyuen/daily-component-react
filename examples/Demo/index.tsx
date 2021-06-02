import React from 'react';
import ReactDOM from 'react-dom';
import { Demo } from '../../src/components/Demo';

const App = () => {
  return (
    <Demo />
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
