import React, { Component } from 'react';

import '../App.css';

class ModalWrapper extends Component {

    render() {

        return (
            <div>
                <div className="background-dummy"/>
                <div className="modal-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ModalWrapper;
