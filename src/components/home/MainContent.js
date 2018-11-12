import React, { Component } from 'react';
import '../../css/home/mainContent.css'

// import ButtonSection from './ButtonSection';
import WelcomeSection from './WelcomeSection'
import NextAndTimer from './NextAndTimer'
import FaqSection from './FaqSection';

class MainContent extends Component {   
    render() {
        return (
            <div className="MainContent-container">
                <WelcomeSection />
                <NextAndTimer dataFinal={this.props.dataFinal}/>
                {/*<ButtonSection />*/}
                <FaqSection />
            </div>
        );
    }
}

export default MainContent;