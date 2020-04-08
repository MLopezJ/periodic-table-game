import React, {Component} from 'react';
import './../css/index.css'
import './../css/colorsOfTheElements.css'
import './../css/chemicalElement.css'


class Modal extends Component{

    constructor() {
        super();
        this.state = { 
            showInstructions: true
         };

         this.toggleShowInstructions = this.toggleShowInstructions.bind(this);
    }

    toggleShowInstructions() {
        this.setState({
            showInstructions : !this.state.showInstructions
        });
    }

    instructions = () => {

        return(
            <div>
                <div className={'overlay'} onClick={this.toggleShowInstructions}></div>
                <div className={'styleElementModal modal modal-page '}> 
                    <div className={'box'}>
                            {
                                <div className={'box-body-information'}>
                                
                                    <div className={'box-header information alkali_metals'}>
                        
                                        <div className={'element-name'}>
                                            {'How to play'}
                                        </div>

                                    </div>
                                </div>  
                            }

                        <div className={'box-body'}>
                            {
                                <div className={'box-body-information-footer information amphigens'}>
                                1: Identify the elements that are shaking
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information noble_gases'}>
                                2: Click on them
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information transition_metals'}>
                                3: Fill the correct name of the element
                                </div>  
                            }
                            
                            
                        </div>
                    </div>
                </div>
        </div>
        )
    }

    render(){
        if (this.state.showInstructions){
            return(
                this.instructions()
            )
        }
        else{
            return null
        }
    }
}

export default Modal;