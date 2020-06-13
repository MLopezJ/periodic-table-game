import React, {Component} from 'react';
import './../css/index.css'
import './../css/colorsOfTheElements.css'
import './../css/chemicalElement.css'


class Modal extends Component{

    constructor() {
        super();
        this.state = { 
            showInstructions: false, 
            showHowtoPlay : false, 
            showAboutTheAuthor : false, 
            showChooseLenguage : false,
            modalTittle : "Settings",
            title : undefined,
            language : undefined,
            howToPlay: undefined,
            chooseLanguage : undefined,
            aboutTheAuthor: undefined,
            exit: undefined,
            back: undefined, 

            howToPlay1: undefined,
            howToPlay2: undefined,
            howToPlay3: undefined, 

            language1: undefined, 
            language2: undefined
        };

        this.toggleShowInstructions = this.toggleShowInstructions.bind(this);
        this.toggleShowHowToPlay = this.toggleShowHowToPlay.bind(this);
        this.toggleShowAboutTheAuthor = this.toggleShowAboutTheAuthor.bind(this);
        this.toggleShowChooseLenguage = this.toggleShowChooseLenguage.bind(this);
        this.toggleModalTittle = this.toggleModalTittle.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
    }

    returnElement = (elementTitle) => {
        
        const element = this.props.text.elements.find(
            item => item.id === elementTitle
        )
        return element
    }

    setTitle = (changeLanguage) => {
        const title = this.returnElement("modalTitle");
        const howToPlay = this.returnElement("howToPlayTitle");
        const chooseLanguage = this.returnElement("languageTitle");
        const aboutTheAuthor = this.returnElement("aboutTheAuthorTitle");
        const exit = this.returnElement("exitTitle");
        const back = this.returnElement("back");

        const instructionHowToPlay1 = this.returnElement("instructionHowToPlay1");
        const instructionHowToPlay2 = this.returnElement("instructionHowToPlay2");
        const instructionHowToPlay3 = this.returnElement("instructionHowToPlay3");

        const language1 = this.returnElement("language1");
        const language2 = this.returnElement("language2");

        const author1 = this.returnElement("author1");
        const author2 = this.returnElement("author2");



        const modalTitle = changeLanguage ? chooseLanguage.text : title.text

        this.setState({
            title: title.text,
            modalTittle : modalTitle,
            howToPlay: howToPlay.text,
            chooseLanguage: chooseLanguage.text,
            aboutTheAuthor: aboutTheAuthor.text,
            exit: exit.text,
            back: back.text,

            instructionHowToPlay1 : instructionHowToPlay1.text,
            instructionHowToPlay2 : instructionHowToPlay2.text,
            instructionHowToPlay3 : instructionHowToPlay3.text, 
            
            language1: language1.text,
            language2: language2.text, 

            author1: author1.text,
            author2: author2.text
        });
    }

    toggleLanguage = (language) => {
        this.setState({
            language : language
        });
    }

    setLanguage = (changeLanguage) => {
        
        this.toggleLanguage(this.props.language)
        this.setTitle(changeLanguage);
    }

    componentDidMount = () => {
        this.setLanguage()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        
        if (prevProps.language == this.props.language & this.props.language != this.state.language){
            this.setLanguage(true)
        }
    }

    toggleModalTittle(title) {
        const modalTittle = title ? title : this.state.title;
        this.setState({
            modalTittle : modalTittle
        });
    }

    toggleShowInstructions() {
        this.setState({
            showInstructions : !this.state.showInstructions
        });
    }

    toggleShowChooseLenguage () {
        this.setState({
            showChooseLenguage : !this.state.showChooseLenguage
        });
        const modalTittle = !this.state.showChooseLenguage ? this.state.chooseLanguage : null;
        this.toggleModalTittle(modalTittle);
    }

    toggleShowAboutTheAuthor () {
        this.setState({
            showAboutTheAuthor : !this.state.showAboutTheAuthor
        });
        const modalTittle = !this.state.showAboutTheAuthor ? "Mauro López" : null;
        this.toggleModalTittle(modalTittle);
    }

    toggleShowHowToPlay() {
        this.setState({
            showHowtoPlay : !this.state.showHowtoPlay
        });
        const modalTittle = !this.state.showHowtoPlay ? this.state.howToPlay : null;
        this.toggleModalTittle(modalTittle);
    }

    handleLenguageChange = (changeEvent) => {
        this.props.toggleLenguage(changeEvent.target.value);
    }

    settings = () => {
        return (
            <div className={'box-body'}>
                {
                    <div className={'box-body-information-footer information amphigens'}
                    onClick={this.toggleShowHowToPlay}>
                    1: {this.state.howToPlay}
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information noble_gases'}
                    onClick={this.toggleShowChooseLenguage}>
                    2: {this.state.chooseLanguage}
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information transition_metals'}
                    onClick={this.toggleShowAboutTheAuthor}>
                    3: {this.state.aboutTheAuthor}
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information metalloids'}
                    onClick={this.props.setShowSettings}>
                    {this.state.exit}
                    </div>  
                }
            </div>
        )
    }

    howToPlay = () => {
        return (
            <div className={'box-body'}>
                {
                    <div className={'box-body-information-footer information amphigens'}>
                    1: {this.state.instructionHowToPlay1}
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information noble_gases'}>
                    2: {this.state.instructionHowToPlay2}
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information transition_metals'}>
                    3: {this.state.instructionHowToPlay3}
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information transition_metals'}
                    onClick={this.toggleShowHowToPlay}>
                    {this.state.back}
                    </div>  
                }
            </div>
        )
    }

    lenguage = () => {
        return (
            <div className={'box-body'}>
                {
                    <div className={'box-body-information-footer information amphigens'}>
                    <div></div>
                    
                    <input type="radio" id="lenguage1" name="lenguage" value="Spanish" 
                    checked = {this.props.language === "Spanish"}
                    onChange= {this.handleLenguageChange}></input>
                    <label for="lenguage1">{this.state.language1}</label>
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information noble_gases'}>
                    
                    <input type="radio" id="lenguage2" name="lenguage" value="English"
                    checked = {this.props.language === "English"}
                    onChange= {this.handleLenguageChange}>
                    </input>
                    <label for="lenguage2">{this.state.language2}</label>
                    
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information transition_metals'}
                    onClick={this.toggleShowChooseLenguage}>
                    {this.state.back}
                    </div>  
                }
            </div>
        )
    }

    aboutTheAuthor = () => {
        return(
            <div className={'box-body'}>     
                {
                    <div className={'box-body-information-footer information basic_metals'}>
                    {this.state.author1}
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information actinoids'}>
                    {this.state.author2}
                    </div>  
                }

                {
                    <div className={'box-body-information-footer information amphigens'}>
                    Mail: lopezjimenezmauro05@gmail.com
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information noble_gases'}>
                    Github: MLopezJ
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information transition_metals'}>
                    Twitter: MauroLopezJ
                    </div>  
                }
                {
                    <div className={'box-body-information-footer information metalloids'}
                    onClick={this.toggleShowAboutTheAuthor}>
                    {this.state.back}
                    </div>  
                }
            </div>
        )
    }

    modal = () => {

        return(
            <div>
                <div className={'overlay'} onClick={this.props.setShowSettings}></div>
                <div className={'styleElementModal modal modal-page '}> 
                    <div className={'box'}>
                            {
                                <div className={'box-body-information'}>
                                
                                    <div className={'box-header information alkali_metals'}>
                        
                                        <div className={'element-name'}>
                                            {`${this.state.modalTittle}`}
                                        </div>

                                    </div>
                                </div>  
                            }

                        <div className={'box-body'}>
                        {this.state.showHowtoPlay ? this.howToPlay() : null }
                        {this.state.showAboutTheAuthor ? this.aboutTheAuthor() : null }
                        {this.state.showChooseLenguage ? this.lenguage() : null }
                        {!this.state.showHowtoPlay && !this.state.showAboutTheAuthor
                        && !this.state.showChooseLenguage ?
                            this.settings() : null}
                        </div>
                    </div>
                </div>
        </div>
        )
    }

    

    render(){
        
        if (this.props.showSettings){
            return(
                this.modal()
            )
        }
        else{
            return null
        }
    }
}

export default Modal;