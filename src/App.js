import React, { Component } from 'react';
import Matrix from './Components/Matrix';
import AppHeader from './Components/AppHeader';
import Footer from './Components/Footer';
import Instructions from './Components/Instructions';
import EndOfGame from './Components/EndOfGame';
//import './App.css';
import './css/index.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
        showSettings: true,
        language: "Spanish",
        text : require('./Data/textSpanish.json'), 
        elementsToGuess : undefined, 
        endOfGame : false
    }
    this.setShowSettings = this.setShowSettings.bind(this);
    this.toggleLenguage = this.toggleLenguage.bind(this);
    this.setElementsToGuess = this.setElementsToGuess.bind(this);
    this.setEndOfGame = this.setEndOfGame.bind(this);
    this.updateElementsToGuess = this.updateElementsToGuess.bind(this);
    this.textEnglish = require('./Data/text.json');
    this.textSpanish = require('./Data/textSpanish.json');
    this.startTime = undefined;
    this.timeElapsed = undefined;
}

setEndOfGame = () => {
  this.setState({
    endOfGame: !this.state.endOfGame
  });
}

setElementsToGuess = (arr) => {
  this.setState({
    elementsToGuess: arr
  });
}

createElementsToGuess = () => {
  var arr = [];
  while(arr.length < 3){
    var id = Math.floor(Math.random() * 118) + 1;
    var element = {
        id: id,
        guessed : false,
        curiousFact : null
    }
    if((arr.findIndex(element => element.id === id)) === -1 ) arr.push(element);
  }
  this.setElementsToGuess(arr);
}

updateElementsToGuess = (arr, id, attribute, value) => {
  var index = arr.findIndex(element => element.id === id) 
  if (index !== -1){
    arr[index][attribute] = value
  }
  this.setElementsToGuess(arr);
}

setCuriousFact = (id) => {
  const curiousFact = "something"; // add custom curious fact 
  this.updateElementsToGuess(this.state.elementsToGuess, id, "curiousFact", curiousFact);
  this.checkElementsGuessState();
}

checkElementsGuessState = () => {
  const allElementsGuessed = this.state.elementsToGuess.every( element => {
    return element.guessed === true ;
  })

  if (allElementsGuessed){
    var timeElapsedMillis = Math.abs(new Date() - this.startTime);
    var timeElapsed = this.millisToMinutesAndSeconds(timeElapsedMillis);
    this.timeElapsed = timeElapsed;
    this.setEndOfGame();
  }
}

toggleText = () => {
  const text = this.state.language === "Spanish" ? this.textSpanish : this.textEnglish;
  
  this.setState({
    text: text
  });
}

millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  const time = [minutes, seconds];
  return time;
}

setShowSettings = () => {
  this.setState({
    showSettings: !this.state.showSettings
  });
  if (this.startTime === undefined){
    this.startTime = new Date();
  }
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
            text = {this.state.text.elementModal}
            elementsToGuess = {this.state.elementsToGuess}
            createElementsToGuess = {this.createElementsToGuess}
            updateElementsToGuess = {this.updateElementsToGuess}
            setCuriousFact = {this.setCuriousFact}
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
          <EndOfGame
            text = {this.state.text.endOfGame}
            language = {this.state.language}
            showModal = {this.state.endOfGame}
            timeElapsed = {this.timeElapsed}
          />
        </div>
      </div>
    );
  }
}

export default App;
