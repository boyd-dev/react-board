import React, { Component } from 'react';
import Home from './layouts/Home';
import store from './store';
import {Provider} from 'react-redux'


class App extends Component {

    render() {

        console.log("App.js");

        return (
            <div>
                <Provider store={store}>
                    <Home />
                </Provider>
            </div>

        );
    }
}

export default App;


