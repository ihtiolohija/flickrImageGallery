import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GalleryContainer from './pages/GalleryContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
          <GalleryContainer/>
      </div>
    );
  }
}

export default App;
