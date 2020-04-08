import React, { Component } from 'react';
import Matrix from './Components/Matrix';
import AppHeader from './Components/AppHeader';
import Footer from './Components/Footer';
import Instructions from './Components/Instructions';
//import './App.css';
import './css/index.css'

class App extends Component {
  render() {
    return (
      <div className={'app'}>
        <div className={'app-content'}>
          <AppHeader/>
          <Matrix/>
          <Footer/>
          <Instructions/>
        </div>
      </div>
    );
  }
}

export default App;
