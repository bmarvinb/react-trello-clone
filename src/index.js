import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reducer, { initialState } from './core/api/reducer';
import { StateProvider } from './core/api/StateProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
    module.hot.accept();
}
