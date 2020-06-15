import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import ChemicalElement from './../Components/ChemicalElement'
import './../css/index.css'


class Square extends Component {

    constructor() {
        super();
        this.state = {
            chemicalElement : undefined,
            modalChemicalElementInformation : false, 
            chemicalElementGroupName : undefined,
            shake : undefined,
            nameValue : undefined, 
            inputShadow : undefined,
            chemicalElementsSpanish : undefined,
            lenguage : undefined
        }

        this.chemicalElements = require('./../Data/chemicalElements');
        this.chemicalElementsSpanish = require('./../Data/chemicalElementsSpanish');
    }

    emptySquare = () => (
        <div className={'Empty'}>
        </div>
    )

    tinySquare = () => (
        <div className={'Tiny'}>
        </div>
    )

    getElement = () => {
        let element = Object.assign(
            {},
            this.chemicalElements.find(
                item => item.atomic === this.props.positionOfSquareInFormat
            )
        )
        
        if (this.props.lenguage === "Spanish"){
            const elementSpanish = this.chemicalElementsSpanish.find(item => item.atomic === this.props.positionOfSquareInFormat)
            element.name = elementSpanish.name;
            element.group = elementSpanish.group;
        }

        return element

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
        
        return groupName
    }

    ChemicalElement = () => {
        const element = this.getElement();
        const chemicalElementGroupName = this.prettyGroupName(element.group);

        // Agregar los datos curiosos a lista de elementos seleccionados
        
        return(
            <ChemicalElement
                element = {element}
                chemicalElementGroupName = {chemicalElementGroupName}
                elementsToGuess= {this.props.elementsToGuess} 
                updateSelectedElements = {this.props.updateSelectedElements}
                updateElementsToGuess = {this.props.updateElementsToGuess}
                text = {this.props.text}
                setCuriousFact = {this.props.setCuriousFact}
                closeChemicalElementModal = {this.props.closeChemicalElementModal}
                setCloseChemicalElementModal = {this.props.setCloseChemicalElementModal}
            />
        )
    }

    render(){
        return(
            <div className={'Square '} >
                {
                    this.props.positionOfSquareInFormat > 0 ?
                        this.ChemicalElement()
                    :
                        null
                }

                {
                    this.props.positionOfSquareInFormat === 0 ?
                        this.emptySquare()
                    :
                        null
                }

                {
                    this.props.positionOfSquareInFormat < 0 ?
                        this.tinySquare()
                    :
                        null
                }
            </div>
        );
    }


    
    
}

Square.propTypes = {

    positionOfSquareInFormat : PropTypes.number.isRequired
        
}

export default Square;