import React from 'react';
//import { uport } from '../utils/connectors'

import * as Const from '../Const'

export const UserInfo = ({userInfo}) => {

    /*
    const name = uport.state.name;
    const did = uport.state.did;
    if (uport.did) {
        console.log(did, name);
    }
    */


    let userDetails = Const.DUMMY_USER + '(dummy user)';
    if (Object.getOwnPropertyNames(userInfo).length > 0 && userInfo.name !== '') {
        userDetails = '😁 ' + userInfo.name;
    }

    return <div style={{fontFamily: 'Consolas', fontSize: '14px'}}>
                <b>{userDetails}</b>
           </div>
}
