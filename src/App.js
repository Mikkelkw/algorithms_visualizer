import React from 'react';
import StartPage from './StartPage';

//main react app rendered as a standard react component. We use the startPage component to avoid changing standard react code
import './App.css';

function App() {
  return (
    <div className="App">
      <StartPage></StartPage>
    </div>
  );
}

export default App;
