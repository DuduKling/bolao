import React, { Component } from 'react';

import SiteHeader from './common/SiteHeader';
import MainContent from './home/MainContent';
import SiteFooter from './common/SiteFooter';
// import RankContainer from './RankContainer';


class PageHome extends Component {
    constructor(){
        super();
        // this.state = {DataFinal: 'Jun 14, 2018 12:00:00', DataFinal2: 'May 26, 2018 12:05:00'}
        this.state = {dataFinal: 'Jun 14, 2019 11:00:00'}
    }
    
    render() {
        return (
            <div className="home">

                <SiteHeader />

                <MainContent dataFinal={this.state.dataFinal}/>

                {/*<Regulamento />*/}

                {/*<RankContainer placedIn="home" />*/}

                <SiteFooter />

          </div>
        );
    }
}

export default PageHome;