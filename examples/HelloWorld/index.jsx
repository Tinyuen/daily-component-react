import React from 'react';
import ReactDOM from 'react-dom';
import { HelloWorld } from '../../components/HelloWorld';
import '../../components/HelloWorld/style';

const App = () => {
  return (
    <HelloWorld name="Tinyuen" />
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
