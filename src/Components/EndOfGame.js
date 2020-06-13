import React, {Component} from 'react';
import './../css/index.css'
import './../css/colorsOfTheElements.css'
import './../css/chemicalElement.css'


class EndOfGame extends Component{

    constructor() {
        super();
    }

    modal = () => {

        return(
            <div>
                <div className={'overlay'} onClick={null}></div>
                <div className={'styleElementModal modal modal-page '}> 
                    <div className={'box'}>
                    {
                        <div className={'box-body-information'}>
                        
                            <div className={'box-header information alkali_metals'}>
                
                                <div className={'element-name'}>
                                    {`MODAL`}
                                </div>

                            </div>
                        </div>  
                    }

                    <div className={'box-body'}>

                        <div className={'box-body'}>
                            {
                                <div className={'box-body-information-footer information amphigens'}>
                                1: "Something"
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information noble_gases'}>
                                2: "Something"
                                </div>  
                            }
                            {
                                <div className={'box-body-information-footer information transition_metals'}>
                                3: "Something"
                                </div>  
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