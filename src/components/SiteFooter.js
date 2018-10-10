import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class SiteFooter extends Component {
    render() {
        return (
            <footer className="footer">
                <p>Feito com &hearts; por <a href="https://dudukling.github.io/" rel="noopener noreferrer" target="_blank">Dudu</a>.</p>
                <p><i>Versão beta</i></p>
                {/*<p>Admin: <Link to="/admin">/admin</Link></p>*/}
            </footer>
        );
    }
}

export default SiteFooter;