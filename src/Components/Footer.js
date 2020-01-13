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
            showDedicationMessage: false
         };

         this.toggleShowDedicationMessage = this.toggleShowDedicationMessage.bind(this);
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
                                Para:
                                <div className={'box-header information alkali_metals'}> {/*  ${this.state.chemicalElement.group} */}
                        
                            <div className={'element-name'}>
                                {'Marianne'}
                            </div>

                            <div className={'element-group'}>
                                {'Hull'}
                            </div>

                            <div className={'element-group'}>
                                {'Cantillo'}
                            </div>
                        </div>
                                </div>  
                            }

                        <div className={'box-body'}>
                            {
                                <div className={'box-body-information-footer information amphigens'}>
                                Hecho con código y cariño para una gran persona,
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information noble_gases'}>
                                brillante química,
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information transition_metals'}>
                                talentosa comediante, bailarina y cantante.
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information basic_metals'}>
                                Que tiene un corazón gigante y lleno de cariño, 
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information alkali_earth_metals'}>
                                una mirada transparentes como su alma 
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information actinoids'}>
                                y una sonrisa para cada nueva situación 
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
                <div onClick={this.toggleShowDedicationMessage}>
                    <h1 className={'title'}>{'<ML/>'}</h1>
                   {/*<h4 className={'title'}> {'Diciembre, 2018'} </h4>*/}
                </div>
            </div>
            </div>
        )
    }
}

export default Footer;