import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {uportLogin, uportLogout} from '../actions';
import Loader from 'react-loader-spinner';

import '../App.css';

/**
 * 메인 화면
 *
 */
class Main extends Component {

    render() {

        return (
            <div className="main-menu">
                <ul>
                    {
                        (!this.props.loggedIn)
                        ? <LoginButton onUportLogin={this.props.onUportLogin} />
                        : <LogoutButton onUportLogout={this.props.onUportLogout} userInfo={this.props.userInfo}/>
                    }
                    <li><Link to="/list">[react-Board]</Link></li>
                </ul>
                {this.props.pending?<b> Loading... Please wait! <Loader type="Grid" color="#CE62D4" height="20" width="20"/></b>:null}
            </div>
        );
    }
}

const LoginButton = ({onUportLogin}) => {
    return(
        <li>
            <a href="#" onClick={onUportLogin}>[Login with uPort]</a>
        </li>
    )
}

const LogoutButton = ({onUportLogout, userInfo}) => {
    return(
        <li>Hello, {userInfo.name}! <a href="#" onClick={onUportLogout}>[Logout from uPort]</a></li>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        userInfo: state.userInfo,
        pending: state.pending
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onUportLogin: (event) => {
            event.preventDefault();
            dispatch(uportLogin());
        },
        onUportLogout: (event) => {
            event.preventDefault();
            dispatch(uportLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
