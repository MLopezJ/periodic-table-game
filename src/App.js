import React, { Component } from 'react';
import Matrix from './Components/Matrix';
import AppHeader from './Components/AppHeader';
import Footer from './Components/Footer';
import Instructions from './Components/Instructions';
//import './App.css';
import './css/index.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
        showSettings: true
    }
    this.setShowSettings = this.setShowSettings.bind(this);
}

setShowSettings = () => {
  this.setState({
    showSettings: !this.state.showSettings
  });
}

  render() {
    console.log(this.state.showSettings)
    return (
      <div className={'app'}>
        <div className={'app-content'}>
          <AppHeader/>
          <Matrix/>
          <Footer
            setShowSettings = {this.setShowSettings}
          />
          if (this.state.showSettings){
            <Instructions
              showSettings = {this.state.showSettings}
              setShowSettings = {this.setShowSettings}
            />
          }
          
        </div>
      </div>
    );
  }
}

export default App;
