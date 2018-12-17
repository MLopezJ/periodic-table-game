import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import ChemicalElement from './../Components/ChemicalElement'
import './../css/index.css'


class Square extends Component {

    emptySquare = () => (
        <div className={'Empty'}> 
            {/*  
            <p>{'empty'}</p>
            */}
        </div>
    )

    tinySquare = () => (
        <div className={'Tiny'}> 
            {/*
            <p className={'Tiny'}>{'tiny'}</p>
            */}
        </div>
    )

    render(){
        return(
            <div className={'Square'} >
                {
                    this.props.positionOfSquareInFormat > 0 ?
                        <ChemicalElement
                            atomicNumber = {this.props.positionOfSquareInFormat}
                        />
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