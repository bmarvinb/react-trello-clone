import React, { Component } from 'react';

import { GlobalStyle } from './global-styles';
import Routes from './core/routes';

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <GlobalStyle />
                <Routes />
            </React.Fragment>
        );
    }
}
