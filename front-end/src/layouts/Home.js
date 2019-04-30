import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListContainer from './ListContainer';
import PostContainer from './PostContainer';
import ReadContainer from './ReadContainer';
import ModifyContainer from './ModifyContainer';
import Main from './Main';


class Home extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/list" component={ListContainer} />
                    <Route path="/post" component={PostContainer} />
                    <Route path="/read" component={ReadContainer} />
                    <Route path="/modify" component={ModifyContainer} />
                </Switch>
            </Router>

        )
    }

}

export default Home;