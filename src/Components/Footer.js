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
            showDedicationMessage: false,
            title : undefined,
            language : undefined
         };

        this.toggleShowDedicationMessage = this.toggleShowDedicationMessage.bind(this);
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

    toggleShowDedicationMessage() {
        this.setState({
            showDedicationMessage : !this.state.showDedicationMessage
        });
    }

    dedicationMessage = () => {
        if (this.state.showDedicationMessage){

        return(
            <div>
                <div className={'overlay'} onClick={this.toggleShowDedicationMessage}></div>
                <div className={'styleElementModal modal modal-page '}> 
                    <div className={'box'}>
                            {
                                <div className={'box-body-information'}>
                                Created by:
                                <div className={'box-header information alkali_metals'}> {/*  ${this.state.chemicalElement.group} */}
                        
                            <div className={'element-name'}>
                                {'Mauro'}
                            </div>

                            <div className={'element-group'}>
                                {'López'}
                            </div>

                            <div className={'element-group'}>
                                {'Jiménez'}
                            </div>
                        </div>
                                </div>  
                            }

                        <div className={'box-body'}>

                             
                            {
                                <div className={'box-body-information-footer information basic_metals'}>
                                Enthusiastic team player, techno utopian and deep creative thinker.
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information actinoids'}>
                                Constant, dynamic and willing to take challenges.
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
                            
                            
                        </div>
                    </div>
                </div>
        </div>
        )
        }
    }

    render(){
        
        return(
            <div>
                {this.dedicationMessage()}
                <div className={'footer'}>
                    <div id="authorDescription" onClick={this.toggleShowDedicationMessage}>
                        <h1 className={'title'}>{'<MauroLopez/>'}</h1>
                    </div>

                    <div id="settings" onClick={this.props.setShowSettings}>
                        <h1 className={'title'}>{this.state.title}</h1>
                    </div>
                </div>

                
            </div>
        )
    }
}

export default Footer;