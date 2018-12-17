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
            chemicalElementGroupName : undefined
        }

        this.words = {1:'M', 5:'A', 18:'U', 21:'R', 33:'O', 38:'L', 43:'O', 52:'P',72:'E',111:'Z'}

        this.setChemicalElement = this.setChemicalElement.bind(this);
        this.toggleModalChemicalElementInformation = this.toggleModalChemicalElementInformation.bind(this);
        this.prettyGroupName = this.prettyGroupName.bind(this);
        this.chemicalElements = require('./../Data/chemicalElements');
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
        this.setChemicalElement(element)
    }

    

    render(){
        return(
            <div className = {'chemicalElement'}> 
                {
                    this.state.chemicalElement !== undefined ?
                        <div className= {`periodic-table-element information ${this.state.chemicalElement.group}`}> 
                            {console.log(this.state.chemicalElement)}
                            <div className={'atomic'}>{this.state.chemicalElement.atomic}</div>
                            <div className={'symbol'}>{this.state.chemicalElement.symbol}</div>
                            <div className={'name'}>{this.state.chemicalElement.name}</div>
                            <canvas onClick={this.toggleModalChemicalElementInformation} className="ink"></canvas>
                        </div>
                    :
                        null
                }

                {/*
                    this.state.modalChemicalElementInformation ?
                        <div className={'a'}>
                            {this.words[this.state.chemicalElement.atomic]}
                        </div>
                    :
                        null
                */}
                {
                    this.state.modalChemicalElementInformation ?
                       <div>
                           <div className={'overlay'} onClick={this.toggleModalChemicalElementInformation}></div>
                            <div className={'styleElementModal modal modal-page '}> 
                                <div className={'box'}>

                                    <div className={`box-header information ${this.state.chemicalElement.group} `}>
                                        <div className={'element-name'}>
                                            {this.state.chemicalElement.name}
                                        </div>

                                        <div className={'element-group'}>
                                            {this.state.chemicalElementGroupName}
                                            
                                        </div>
                                    </div>

                                    <div className={'box-body'}>

                                        {
                                            this.state.chemicalElement.atomic !== null &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Atomic Number
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.atomic}
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.symbol &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Symbol
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.symbol}
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.atomicMass &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Mass
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.atomicMass}
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.electronicConfiguration &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Electronic Conf.
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.electronicConfiguration}
                                                </div>
                                            </div>

                                        }

                                        {
                                            this.state.chemicalElement.electronegativity &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Electronegativity
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.electronegativity}
                                                </div>
                                            </div>
                                        }

                                        {
                                            this.state.chemicalElement.atomicRadius &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Atomic Radius
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.atomicRadius} pm
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.ionRadius &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Ionic Radius
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.ionRadius} pm
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.vanDelWaalsRadius !== null &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Van der Waals Radius
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.vanDelWaalsRadius} pm
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.ionizationEnergy &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Ionic Energic
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.ionizationEnergy} mol
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.electronAffinity !== null &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Electronic affinity
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.electronAffinity}
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            this.state.chemicalElement.oxidationStates &&
                                            <div className={'box-body-information'}>
                                                <div className={'box-body-information-key'}>
                                                    Oxidation state
                                                </div>
                                                <div className={'box-body-information-value'}>
                                                    {this.state.chemicalElement.oxidationStates} 
                                                </div>
                                            </div>
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