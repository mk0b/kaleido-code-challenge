import React from 'react';
import './App.css';

//TODO: Make this into a stateful component.

import Header from './Header';
import RegisterComponent from './RegisterCompound';

function App() {
  return (
    <div className="App">
      <Header />
      <RegisterComponent />
    </div>
  );
}

export default App;
