import React, {Component} from 'react';
import './../css/footer.css';
import './../css/index.css';

import './../css/index.css'
import './../css/colorsOfTheElements.css'
import './../css/chemicalElement.css'


class Footer extends Component{

    constructor() {
        super();
        this.state = { 
            title : undefined,
            language : undefined
         };

        this.setTitle = this.setTitle.bind(this);
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

    toggleLanguage = (language) => {
        this.setState({
            language : language
        });
    }

    setLanguage = () => {
        this.toggleLanguage(this.props.language)
        this.setTitle();
    }

    componentDidMount = () => {
        this.setLanguage()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.language == this.props.language & this.props.language != this.state.language){
            this.setLanguage()
        }
    }


    render(){
        
        return(
            <div>
                <div className={'footer'}>
                    <div id="settings" onClick={this.props.setShowSettings}>
                        <h1 className={'title'}>{this.state.title}</h1>
                    </div>
                </div>

                
            </div>
        )
    }
}

export default Footer;