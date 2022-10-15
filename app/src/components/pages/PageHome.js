import '../../css/pages/mainContent.css';

import React, { useState } from 'react';

import WelcomeSection from '../home/WelcomeSection';
import NextAndTimer from '../home/NextAndTimer';
import FaqSection from '../home/FaqSection';
import Canvas from '../home/Canvas';

function PageHome() {
    const [dataFinal] = useState('Nov 20, 2022 13:00:00');

    return (
        <div className="MainContent-container">
            <div className="MainContent-foreground">
                <WelcomeSection />
                <NextAndTimer dataFinal={dataFinal} />
                <FaqSection />
            </div>
            <Canvas />
        </div>
    );
}

export default PageHome;
