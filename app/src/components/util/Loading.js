import React, { Component } from 'react';
import '../../css/util/loading.css';

class Loading extends Component {
    render() {
        if(this.props.loading){
            return(
                <div className={this.props.localstorage?"spinner "+this.props.localstorage:"spinner"}>
                    <div className="half-circle-spinner">
                        <div className="circle circle-1"></div>
                        <div className="circle circle-2"></div>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="spinner-hide"></div>
            ); 
        }
    }
}

export default Loading;