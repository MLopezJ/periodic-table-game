import React, {Component} from 'react';
import './../css/index.css'
import './../css/colorsOfTheElements.css'
import './../css/chemicalElement.css'
import './../css/footer.css'

class EndOfGame extends Component{

    constructor() {
        super();

        this.state = {
            title : undefined,
            time: undefined,
            minutes : undefined,
            seconds : undefined,
            objetiveCompleted : undefined,
            language : undefined, 
            playAgain : undefined
        }

        this.setTitle = this.setTitle.bind(this);
        this.setMinutes = this.setMinutes.bind(this);
        this.setTime = this.setTime.bind(this);
        this.setSeconds = this.setSeconds.bind(this);
        this.setObjetiveCompleted = this.setObjetiveCompleted.bind(this);
        this.setPlayAgain = this.setPlayAgain.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
    }

    setTitle = () => {
        const title = this.props.text.elements.find(
            item => item.id === "title"
        )
        
        this.setState({
            title: title.text
        });
    }

    setTime = () => {
        const time = this.props.text.elements.find(
            item => item.id === "time"
        )
        
        this.setState({
            time: time.text
        });
    }

    setMinutes = () => {
        const minutes = this.props.text.elements.find(
            item => item.id === "minutes"
        )
        
        this.setState({
            minutes: minutes.text
        });
    }

    setSeconds = () => {
        const seconds = this.props.text.elements.find(
            item => item.id === "seconds"
        )
        
        this.setState({
            seconds: seconds.text
        });
    }

    setObjetiveCompleted = () => {
        const objetiveCompleted = this.props.text.elements.find(
            item => item.id === "objetiveCompleted"
        )
        
        this.setState({
            objetiveCompleted: objetiveCompleted.text
        });
    }

    setPlayAgain = () => {
        const playAgain = this.props.text.elements.find(
            item => item.id === "playAgain"
        )
        
        this.setState({
            playAgain: playAgain.text
        });
    }

    toggleLanguage = (language) => {
        this.setState({
            language : language
        });
    }

    setLanguage = () => {
        
        this.toggleLanguage(this.props.language)
        this.setTitle();
        this.setTime();
        this.setMinutes();
        this.setSeconds();
        this.setObjetiveCompleted();
        this.setPlayAgain();
    }

    showTime = () => {
        const text = this.props.timeElapsed[0] > 0 ? 
            this.props.timeElapsed[0] + " " + this.state.minutes + " : " + this.props.timeElapsed[1] + " " + this.state.seconds
            :
            this.props.timeElapsed[1] + " " + this.state.seconds

        return(
            <div className={'box-body-information-simple information noble_gases'}>
            {this.state.time} = {text}
            </div> 
        )
    }

    reloadPage = () => {
        //window.location.reload()
        this.props.createElementsToGuess();
        this.props.setStateEndOfGame();
        this.props.restartTime();
    }

    playAgain = () => {
        return(
            <div className={'box-body-information-simple information transition_metals'}
            onClick = {this.reloadPage}>
                {this.state.playAgain}
            </div> 
        ) 
    }

    componentDidMount = () => {
        this.setLanguage()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.language == this.props.language & this.props.language != this.state.language){
            this.setLanguage()
        }
    }

    modal = () => {

        return(
            <div>
                <div className={'overlay'} onClick={null}></div>
                <div className={'styleElementModal modal modal-page '}> 
                    <div className={'box'}>
                    <span className="closeModalButton" onClick={this.props.setStateEndOfGame}>&times;</span>
                    {
                        <div className={'box-body-information'}>
                        
                            <div className={'box-header information alkali_metals'}>
                
                                <div className={'element-name'}>
                                    {this.state.title}
                                </div>

                            </div>
                        </div>  
                    }

                    <div className={'box-body'}>

                        <div className={'box-body'}>
                            {
                                <div className={'box-body-information-simple information amphigens'}>
                                {this.state.objetiveCompleted}
                                </div>  
                            }
                            {
                                this.showTime()
                            }

                            {
                                this.playAgain()
                            }
                        </div>

                    </div>
                    </div>
                </div>
        </div>
        )
    }

    

    render(){
        
        if (this.props.showModal){
            return(
                this.modal()
            )
        }
        else{
            return null
        }
    }
}

export default EndOfGame;