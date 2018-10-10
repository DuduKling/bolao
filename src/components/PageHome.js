import React, { Component } from 'react';

import SiteHeader from './SiteHeader';
import ButtonSection from './ButtonSection';
import SiteFooter from './SiteFooter';
// import RankContainer from './RankContainer';
// import Regulamento from './Regulamento';

class PageHome extends Component {
    constructor(){
        super();
        // this.state = {DataFinal: 'Jun 14, 2018 12:00:00', DataFinal2: 'May 26, 2018 12:05:00'}
        this.state = {DataFinal: 'Jul 14, 2018 11:00:00'}
    }
    
    render() {
        return (
            <div className="home">

                <SiteHeader dataFinal={this.state.DataFinal}/>

                <ButtonSection dataFinal={this.state.DataFinal}/>

                {/*<Regulamento />*/}

                {/*<RankContainer placedIn="home" />*/}

                <SiteFooter />

          </div>
        );
    }
}

export default PageHome;