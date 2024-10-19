import React from 'react';
import TaskList from './TaskList'; // Import the TaskList component
import './App.css'; // Import App-specific CSS

const App = () => {
  return (
    <div className="App">
      <h1>Drag & Drop Task List</h1>
      <TaskList />
    </div>
  );
};

export default App;
