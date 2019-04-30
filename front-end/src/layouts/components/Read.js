import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import * as Const from '../../Const';

import '../../App.css';
import {UserInfo} from "../UserInfo";



class Read extends Component {


    constructor(props) {

        super(props);

        CKEditor.editorUrl = Const.EDITOR_URL;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        //삭제 후 목록 이동
        if (nextProps.response.result === undefined && nextProps.response.success) {
            this.props.history.push('/list');
            return false; //삭제한 후에는 컴포넌트 랜더링할 필요가 없으므로 false
        }

        if (nextProps.response.result !== undefined && !nextProps.response.success) {
            //TODO error handling
            alert(nextProps.response.result);
            return false;
        }
        return true;
    }


    handleModify = () => {
        this.props.history.push('/modify');
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id);
    }

    handleList = () => {
        this.props.history.push('/list');
    }

    render() {

        return (
            <div className="form-main">
                <UserInfo userInfo={this.props.userInfo}/>
                <div style={{textAlign: 'right'}}>
                    <button className="btn-normal" onClick={this.handleModify}>수정</button>{' '}
                    <button className="btn-normal" onClick={this.handleDelete}>삭제</button>{' '}
                    <button className="btn-normal" onClick={this.handleList}>목록</button>
                </div>
                <input type="text" className="input_title" defaultValue={this.props.response.result[0].cnttTitle} readOnly={true}/>
                <CKEditor
                    data={this.props.response.result[0].cnttPost}
                    readOnly={true}
                />

            </div>
        )
    }
}

export default Read;