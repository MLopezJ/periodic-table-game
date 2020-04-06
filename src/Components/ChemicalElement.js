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
            shake : undefined
        }

        this.setChemicalElement = this.setChemicalElement.bind(this);
        this.toggleModalChemicalElementInformation = this.toggleModalChemicalElementInformation.bind(this);
        this.prettyGroupName = this.prettyGroupName.bind(this);
        this.chemicalElements = require('./../Data/chemicalElements');
        this.shake = this.setShake.bind(this);
    }

    setShake = () => {
        this.setState({
            shake: true
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
                this.setShake();
            }
            
        }
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
                        <div className={`periodic-table-element information ${this.state.chemicalElement.group} ${shake ? "shakeElement":""}`} >
                            {/*console.log(this.state.chemicalElement)*/}
                            <div className={'atomic'}>{this.state.chemicalElement.atomic}</div>
                            <div className={'symbol'}>{this.state.chemicalElement.symbol}</div>
                            <div className={'name'}>{this.state.chemicalElement.name}</div>                
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