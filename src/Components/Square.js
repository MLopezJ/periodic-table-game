import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import ChemicalElement from './../Components/ChemicalElement'
import './../css/index.css'


class Square extends Component {

    emptySquare = () => (
        <div className={'Empty'}>
        </div>
    )

    tinySquare = () => (
        <div className={'Tiny'}>
        </div>
    )

    ChemicalElement = () => {
        return(
            <ChemicalElement
                atomicNumber = {this.props.positionOfSquareInFormat}
                selectedElements = {this.props.selectedElements}
                updateSelectedElements = {this.props.updateSelectedElements}
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