import React, { Component } from 'react';
import '../../css/pages/mainContent.css'

import WelcomeSection from '../home/WelcomeSection'
import NextAndTimer from '../home/NextAndTimer'
import FaqSection from '../home/FaqSection';
import Canvas from '../home/Canvas';

class PageHome extends Component {
    constructor(){
        super();
        // this.state = {DataFinal: 'Jun 14, 2018 12:00:00', DataFinal2: 'May 26, 2018 12:05:00'}
        this.state = {dataFinal: 'Jun 14, 2019 11:00:00'}
    }
    
    render() {
        return (
            <div className="MainContent-container">
                <div className="MainContent-foreground">
                    <WelcomeSection />
                    <NextAndTimer dataFinal={this.state.dataFinal}/>
                    {/*<ButtonSection />*/}
                    <FaqSection />
                </div>
                <Canvas />
            </div>
        );
    }
}

export default PageHome;