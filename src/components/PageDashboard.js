import React, { Component } from 'react';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import RankContainer from './RankContainer';
import GamesContainer from './GamesContainer';
import Tips from './Tips';

class PageHome extends Component {
    constructor() {
        super();
        this.state = {
            fase: ""
        };
    }

    componentWillMount() {
        // console.log("FASE inicial: "+this.state.fase);

        var fase = this.props.match.params.fase;
        // console.log("Da url: "+this.props.match.params.fase);
        this.setState({fase: fase});
        
        // console.log("FASE final: "+this.state.fase);
    }

    render() {
        return (
            <div className="home">

                <SiteHeader />

                <Tips />

                <section className="content">

                    <RankContainer fase_comp={this.state.fase}/>

                    <GamesContainer dash={true} fase_comp={this.state.fase}/>
                    
                </section>
                    
                <SiteFooter />

          </div>
        );
    }
}

export default PageHome;