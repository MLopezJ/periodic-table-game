import React, {Component} from 'react';
import './../css/appHeader.css';
import './../css/index.css';

class AppHeader extends Component{
    render(){
        return(
            <div className={'app-header'}>
                <h1 className={'title'}>Periodic Table</h1>
            </div>
        )
    }
}

export default AppHeader;