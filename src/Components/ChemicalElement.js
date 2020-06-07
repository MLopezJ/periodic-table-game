import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import './../css/index.css'
import './../css/colorsOfTheElements.css'
import './../css/chemicalElement.css'

class ChemicalElement extends Component {

    constructor() {
        super();
        this.state = {
            modalChemicalElementInformation : false, 
            shake : undefined,
            nameValue : undefined, 
            inputShadow : undefined
        }

        this.toggleModalChemicalElementInformation = this.toggleModalChemicalElementInformation.bind(this);
        this.shake = this.setShake.bind(this);
        this.nameValue = this.handleTextChange.bind(this);
        this.inputShadow = this.setInputShadow.bind(this);
    }

    

    setInputShadow = (state) => {
        this.setState({
            inputShadow: state
        });
    }

    setShake = (state) => {
        this.setState({
            shake: state
        });
    }

    toggleModalChemicalElementInformation(){
        this.setState({
            modalChemicalElementInformation: !this.state.modalChemicalElementInformation
        });
    }


    modalInfo = (title, description) => {
        return(
            <div className={'box-body-information'}>
                <div className={'box-body-information-key'}>
                    {title}
                </div>
                <div className={'box-body-information-value'}>
                    {description} 
                </div>
            </div>
        )
    }

    checkShake = () => {
        let shake = null
        if (this.props.selectedElements){
            
            shake = this.props.selectedElements.indexOf(this.props.element.atomic) === -1 ? false : "shake" ;
            
            if (shake){
                this.setShake(true);
            }
        }
    }

    similarity = (s1, s2) => {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
          longer = s2;
          shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
          return 1.0;
        }
        return ((longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength)*100);
    }

    editDistance = (s1, s2) => {
        //s1 = s1.toLowerCase();
        //s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
          var lastValue = i;
          for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
              costs[j] = j;
            else {
              if (j > 0) {
                var newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1))
                  newValue = Math.min(Math.min(newValue, lastValue),
                    costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
              }
            }
          }
          if (i > 0)
            costs[s2.length] = lastValue;
        }
        return costs[s2.length];
      }

    textChange = (event) => {
        
        this.handleTextChange(event.target.value)

        const eventValue = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const stateValue = this.props.element.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        console.log("name ",this.props.element.name)
        var similarity = this.similarity(stateValue,eventValue)
        
        if (event.target.value.length === 0){
            this.setInputShadow(undefined)
        }

        if(similarity >= 0 && similarity < 30  && event.target.value.length > 1){
            this.setInputShadow("inputShadowRed")
        }

        if(similarity >= 30 && similarity < 70 ){
            this.setInputShadow("inputShadowOrange")
        }

        if(similarity >= 70 && similarity < 100 ){
            this.setInputShadow("inputShadowGreen")
        }

        if(stateValue == eventValue){
            console.log("equals")
            this.props.updateSelectedElements(this.props.element.atomic)
            this.setShake(undefined);
        }
        
    }

    handleTextChange = (value) => {
        this.setState({nameValue: value});
    }

    inputText = () => {
        
        return(
            <input className={`${this.state.inputShadow}`} placeholder= {"??"} value={this.state.nameValue} onChange={this.textChange} />
        )
    }

    

    render(){
        
        const { shake } = this.state;

        if(!this.state.shake){
            this.checkShake()
        }

        return(
            <div className = {'chemicalElement'}> 
                {
                    this.props.element !== undefined ?
                        <div className={`periodic-table-element information ${this.props.element.cssStyle} ${shake ? "shakeElement":""}`} >
                            
                            <div className={'atomic'}>{this.props.element.atomic}</div>
                            <div className={'symbol'}>{this.props.element.symbol}</div>
                            {shake?
                                <div className={'name'}>??</div>
                            :
                                <div className={'name'}>{this.props.element.name}</div>
                            }             
                            <canvas onClick={this.toggleModalChemicalElementInformation} className="ink"></canvas>
                        </div>
                    :
                        null
                }

                {
                    this.state.modalChemicalElementInformation ?
                       <div>
                           <div className={'overlay'} onClick={this.toggleModalChemicalElementInformation}></div>
                            <div className={'styleElementModal modal modal-page '}> 
                                <div className={'box'}>

                                    <div className={`box-header information ${this.props.element.cssStyle} `}>
                                        <div className={'element-name'}>
                                        {shake?
                                            this.inputText()
                                        :
                                            this.props.element.name
                                        } 
                                            
                                        </div>

                                        <div className={'element-group'}>
                                            {this.props.chemicalElementGroupName}
                                            
                                        </div>
                                    </div>

                                    <div className={'box-body'}>

                                        {
                                            this.props.element.atomic !== null && 
                                            this.modalInfo(this.props.text.atomicNumber, this.props.element.atomic) 
                                        }
                                        
                                        {
                                            this.props.element.symbol &&
                                            this.modalInfo(this.props.text.symbol, this.props.element.symbol)
                                        }
                                        
                                        {
                                            this.props.element.atomicMass &&
                                            this.modalInfo(this.props.text.mass, this.props.element.atomicMass)
                                        }
                                        
                                        {
                                            this.props.element.electronicConfiguration &&
                                            this.modalInfo(this.props.text.electronicConf, this.props.element.electronicConfiguration)
                                        }

                                        {
                                            this.props.element.electronegativity &&
                                            this.modalInfo(this.props.text.electronegativity, this.props.element.electronegativity)
                                        }

                                        {
                                            this.props.element.atomicRadius &&
                                            this.modalInfo(this.props.text.atomicRadius, this.props.element.atomicRadius)
                                        }
                                        
                                        {
                                            this.props.element.ionRadius &&
                                            this.modalInfo(this.props.text.ionicRadius, `${this.props.element.ionRadius} pm`)
                                        }
                                        
                                        {
                                            this.props.element.vanDelWaalsRadius !== null &&
                                            this.modalInfo(this.props.text.vanDerWaalsRadius, `${this.props.element.vanDelWaalsRadius} pm`)
                                        }
                                        
                                        {
                                            this.props.element.ionizationEnergy &&
                                            this.modalInfo(this.props.text.ionicEnergic, `${this.props.element.ionizationEnergy} mol`)
                                        }
                                        
                                        {
                                            this.props.element.electronAffinity !== null &&
                                            this.modalInfo(this.props.text.electronicAffinity, this.props.element.electronAffinity)
                                        }
                                        
                                        {
                                            this.props.element.oxidationStates &&
                                            this.modalInfo(this.props.text.oxidationState, this.props.element.oxidationStates)
                                        }
                                        
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    :
                        null
                }
                
            </div>
        );
    }
    
}

ChemicalElement.propTypes = {

    atomicNumber : PropTypes.number.isRequired
        
}

export default ChemicalElement;