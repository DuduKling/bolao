import React, { Component } from 'react';
import '../../css/util/loading.css';

class Loading extends Component {

    render() {
        let content;
        if(this.props.loading) {
            content = <div className="spinner">
                        <div className="half-circle-spinner">
                            <div className="circle circle-1"></div>
                            <div className="circle circle-2"></div>
                        </div>
                    </div>;
        } else { 
            content = '';
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Loading;