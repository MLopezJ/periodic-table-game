import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import './../css/index.css'
import './../css/colorsOfTheElements.css'
import './../css/chemicalElement.css'

class ChemicalElement extends Component {

    constructor() {
        super();
        this.state = {
            chemicalElement : undefined,
            modalChemicalElementInformation : false, 
            chemicalElementGroupName : undefined,
            shake : undefined,
            nameValue : undefined, 
            inputShadow : undefined,
            chemicalElementsSpanish : undefined
        }

        this.setChemicalElement = this.setChemicalElement.bind(this);
        this.toggleModalChemicalElementInformation = this.toggleModalChemicalElementInformation.bind(this);
        this.prettyGroupName = this.prettyGroupName.bind(this);
        this.chemicalElements = require('./../Data/chemicalElements');
        this.shake = this.setShake.bind(this);
        this.nameValue = this.handleTextChange.bind(this);
        this.inputShadow = this.setInputShadow.bind(this);
        this.chemicalElementsSpanish = require('./../Data/chemicalElementsSpanish')
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

    prettyGroupName(groupName){
        groupName =  groupName.charAt(0).toUpperCase() + groupName.slice(1)
        var index
        var indicator = true
        while(indicator){
            index = groupName.indexOf('_')
            if (index === -1)
                indicator = false;
            else{
                groupName  = groupName.substr(0,index)+' '+ groupName.substr(index+1, groupName.length-1)
            }  
        }
        //console.log(groupName)
        this.setState({
            chemicalElementGroupName: groupName
        });
    }

    toggleModalChemicalElementInformation(){
        this.prettyGroupName(this.state.chemicalElement.group)
        this.setState({
            modalChemicalElementInformation: !this.state.modalChemicalElementInformation
        });
    }

    setChemicalElement(element){
        this.setState({
            chemicalElement: element
        });
    }
    
    componentDidMount = () =>{
        const element = this.chemicalElements.find(item => item.atomic === this.props.atomicNumber)
        const elementSpanish = this.chemicalElementsSpanish.find(item => item.atomic === this.props.atomicNumber)
        element.name = elementSpanish.name;
        element.group = elementSpanish.group;
        
        this.setChemicalElement(element)
    }

    info = (title, description) => {
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
            
            shake = this.props.selectedElements.indexOf(this.state.chemicalElement.atomic) === -1 ? false : "shake" ;
            
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
        const stateValue = this.state.chemicalElement.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        console.log("name ",this.state.chemicalElement.name)

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
            this.props.updateSelectedElements(this.state.chemicalElement.atomic)
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
                    this.state.chemicalElement !== undefined ?
                        <div className={`periodic-table-element information ${this.state.chemicalElement.cssStyle} ${shake ? "shakeElement":""}`} >
                            {/*console.log(this.state.chemicalElement)*/}
                            <div className={'atomic'}>{this.state.chemicalElement.atomic}</div>
                            <div className={'symbol'}>{this.state.chemicalElement.symbol}</div>
                            {shake?
                                <div className={'name'}>??</div>
                            :
                                <div className={'name'}>{this.state.chemicalElement.name}</div>
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

                                    <div className={`box-header information ${this.state.chemicalElement.cssStyle} `}>
                                        <div className={'element-name'}>
                                        {shake?
                                            this.inputText()
                                        :
                                            this.state.chemicalElement.name
                                        } 
                                            
                                        </div>

                                        <div className={'element-group'}>
                                            {this.state.chemicalElementGroupName}
                                            
                                        </div>
                                    </div>

                                    <div className={'box-body'}>

                                        {
                                            this.state.chemicalElement.atomic !== null && 
                                            this.info("Atomic Number", this.state.chemicalElement.atomic) 
                                        }
                                        
                                        {
                                            this.state.chemicalElement.symbol &&
                                            this.info("Symbol", this.state.chemicalElement.symbol)
                                        }
                                        
                                        {
                                            this.state.chemicalElement.atomicMass &&
                                            this.info("Mass", this.state.chemicalElement.atomicMass)
                                        }
                                        
                                        {
                                            this.state.chemicalElement.electronicConfiguration &&
                                            this.info("Electronic Conf.", this.state.chemicalElement.electronicConfiguration)
                                        }

                                        {
                                            this.state.chemicalElement.electronegativity &&
                                            this.info("Electronegativity", this.state.chemicalElement.electronegativity)
                                        }

                                        {
                                            this.state.chemicalElement.atomicRadius &&
                                            this.info("Atomic Radius", this.state.chemicalElement.atomicRadius)
                                        }
                                        
                                        {
                                            this.state.chemicalElement.ionRadius &&
                                            this.info("Ionic Radius", `${this.state.chemicalElement.ionRadius} pm`)
                                        }
                                        
                                        {
                                            this.state.chemicalElement.vanDelWaalsRadius !== null &&
                                            this.info("Van der Waals Radius", `${this.state.chemicalElement.vanDelWaalsRadius} pm`)
                                        }
                                        
                                        {
                                            this.state.chemicalElement.ionizationEnergy &&
                                            this.info("Ionic Energic", `${this.state.chemicalElement.ionizationEnergy} mol`)
                                        }
                                        
                                        {
                                            this.state.chemicalElement.electronAffinity !== null &&
                                            this.info("Electronic affinity", this.state.chemicalElement.electronAffinity)
                                        }
                                        
                                        {
                                            this.state.chemicalElement.oxidationStates &&
                                            this.info("Oxidation state", this.state.chemicalElement.oxidationStates)
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