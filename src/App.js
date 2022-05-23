import React from 'react';
import Control from './context/control.js';
import ToDo from './components/todo/todo.js';
import './App.css'
export default class App extends React.Component {
  render() {
    //give the state to (todo)

    return (

      <Control>

      <ToDo />
      
      </Control>
    );
  }
}