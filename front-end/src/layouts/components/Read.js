import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import * as Const from '../../Const';

import '../../App.css';
import {UserInfo} from "../UserInfo";
import ModalWrapper from "../ModalWrapper";



class Read extends Component {

    state = {
        confirmFlag: false
    }

    constructor(props) {

        super(props);

        CKEditor.editorUrl = Const.EDITOR_URL;
    }


    //Don't change state here!
    shouldComponentUpdate(nextProps, nextState, nextContext) {

        //삭제 후 목록 이동
        if (nextProps.response.result === undefined && nextProps.response.success) {
            this.props.history.push('/list');
            return false; //삭제한 후에는 컴포넌트 랜더링할 필요가 없으므로 false
        }

        if (nextProps.response.result !== undefined && !nextProps.response.success) {
            console.log(nextProps.response.result);
            return false;
        }

        return true;
    }


    handleModify = () => {

        const userId = this.props.userInfo.did === ''?Const.DUMMY_USER:this.props.userInfo.did;

        if (this.props.response.result[0].did === userId) {
            this.props.history.push('/modify');
        } else {
            console.log('You are not the author of this post');
        }
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id);
    }

    handleDeleteConfirm = () => {

        const userId = this.props.userInfo.did === ''?Const.DUMMY_USER:this.props.userInfo.did;

        if (this.props.response.result[0].did === userId) {
            this.setState({confirmFlag: true});
        } else {
           console.log('You are not the author of this post');
        }
    }

    handleDeleteCancel = () => {
        this.setState({confirmFlag: false});
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
                    <button className="btn-normal" onClick={this.handleDeleteConfirm}>삭제</button>{' '}
                    <button className="btn-normal" onClick={this.handleList}>목록</button>
                </div>
                <input type="text" className="input_title" defaultValue={this.props.response.result[0].cnttTitle} readOnly={true}/>
                <CKEditor
                    data={this.props.response.result[0].cnttPost}
                    readOnly={true}
                />
                {this.state.confirmFlag?<ConfirmRemove handleDeleteCancel={this.handleDeleteCancel} handleDelete={this.handleDelete}>삭제하시겠습니까?</ConfirmRemove>:null}
            </div>
        )
    }
}

//삭제 확인
const ConfirmRemove = ({children, handleDeleteCancel, handleDelete}) => (
    <ModalWrapper>
        <div style={{marginBottom: '10px'}}>{children}</div>
        <div>
            <button className="btn-confirm" onClick={handleDeleteCancel}>Cancel</button>{' '}
            <button className="btn-confirm" onClick={handleDelete}>Delete</button>
        </div>
    </ModalWrapper>
)

export default Read;