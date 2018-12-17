import React, {Component} from 'react';
import Square from './../Components/Square'
import './../css/index.css'


class Matrix extends Component {
    constructor() {
        super();
        this.matrixFormat = require('./../Data/format.json');
    }

    frameOfMatrix = (position, contend) => {
        return(
            <div className = {`row matrixFrame ${position}`}>
                {contend}
            </div>
        )
    }
    
    numberOfColumns = () => {
        const columnsQuantity = this.matrixFormat[0].length+2 // (vertex)
        const listOfColumnsId = Array.apply(null, {length: columnsQuantity}).map(Number.call, Number)
        return(
            <div className='row'>
            {
                listOfColumnsId.map((column, position)=>{
                    if (position === 0 || position === 19 ){
                        return this.frameOfMatrix('vertex',null)
                    }
                    else{
                        return this.frameOfMatrix('numberOfColumn',position)
                    }
                })
            }
            </div>
        )
    }

    matrixRows = () => {

        return this.matrixFormat.map((rowFormat, position)=>{

            var pos = undefined
            if (position <= 6)
                pos = position+1
            else  
                pos = null
            return(
                <div className="row">
                    {this.frameOfMatrix('numberOfRow',pos)}
                    {rowFormat.map((cellIndex)=>{
                        return(
                            <Square
                                positionOfSquareInFormat = {cellIndex}
                            />
                        )
                    })}
                    {this.frameOfMatrix('numberOfRow',pos)}
                </div>
            )
        })
    }


    render(){
        return(
            <div className="periodic-table">
                <div className="table">
                {this.numberOfColumns()}
                {this.matrixRows()}
                </div>
            </div>
        );
    }
    

}

export default Matrix;