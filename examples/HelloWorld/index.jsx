import React from 'react';
import ReactDOM from 'react-dom';
import { HelloWorld } from '../../src/HelloWorld';
import '../../src/HelloWorld/style';

const App = () => {
  return (
    <HelloWorld name="Tinyuen" />
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
