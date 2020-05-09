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
        showSettings: true,
        language: "Spanish",
        text : require('./Data/textSpanish.json')
    }
    this.setShowSettings = this.setShowSettings.bind(this);
    this.toggleLenguage = this.toggleLenguage.bind(this);
    this.textEnglish = require('./Data/text.json');
    this.textSpanish = require('./Data/textSpanish.json');
}

toggleText = () => {
  const text = this.state.language === "Spanish" ? this.textSpanish : this.textEnglish;
  
  this.setState({
    text: text
  });
}

setShowSettings = () => {
  this.setState({
    showSettings: !this.state.showSettings
  });
}

toggleLenguage = (language) => {
  this.setState({
    language: language
  });
}

changeLanguage = (language) => {
  this.toggleLenguage(language);
  this.toggleText();
}

componentDidMount = () => {
  this.toggleText();
}

componentDidUpdate = (prevProps, prevState, snapshot) => {
  
  if(prevState.language !=  this.state.language){
    this.toggleText();
  }
}

  render() {
    
    return (
      <div className={'app'}>
        <div className={'app-content'}>
          <AppHeader
            text = {this.state.text.appHeader}
            language = {this.state.language}
          />
          <Matrix
            lenguage = {this.state.language}
          />
          <Footer
            setShowSettings = {this.setShowSettings}
            text = {this.state.text.footer}
            language = {this.state.language}
          />
          <Instructions
            showSettings = {this.state.showSettings}
            setShowSettings = {this.setShowSettings}
            text = {this.state.text.instructions} 
            language = {this.state.language}
            toggleLenguage = {this.changeLanguage}
          />
         
          
        </div>
      </div>
    );
  }
}

export default App;
