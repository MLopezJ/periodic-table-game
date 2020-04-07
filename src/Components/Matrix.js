import React, {Component} from 'react';
import Square from './../Components/Square'
import './../css/index.css'


class Matrix extends Component {
    constructor() {
        super();
        this.state = {
            selectedElements: undefined, 
            generatedSelectedElements: false
        }
        this.matrixFormat = require('./../Data/format.json');
        this.selectedElements= this.setSelectedElements.bind(this);
        this.generatedSelectedElements= this.setGeneratedSelectedElements.bind(this);
    }

    updateSelectedElements = (id) => {
        const list = this.state.selectedElements; 
        const newList = list.filter(index => index != id)
        this.setSelectedElements(newList);
    }

    setGeneratedSelectedElements= () => {
        this.setState({
            generatedSelectedElements: true
        });
    }

    generatedList = () => {
        var arr = [];
        while(arr.length < 3){
            var r = Math.floor(Math.random() * 118) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        this.setSelectedElements(arr);
    }

    setSelectedElements(arr){
        
        this.setState({
            selectedElements: arr
        });
        if (!this.state.generatedSelectedElements){
            this.setGeneratedSelectedElements();
        }
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
                                selectedElements= {this.state.selectedElements}
                                updateSelectedElements = {this.updateSelectedElements}
                            />
                        )
                    })}
                    {this.frameOfMatrix('numberOfRow',pos)}
                </div>
            )
        })
    }



    render(){
        
        if(this.state.generatedSelectedElements === false){
            this.generatedList()
        }

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