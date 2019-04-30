import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import * as Const from "../../Const";

import '../../App.css';
import {UserInfo} from "../UserInfo";


class Modify extends Component {

    state = {data: '', title: '', msg: Const.EDIT_MSG};

    constructor(props) {

        super(props);

        this.titleRef = React.createRef();

        CKEditor.editorUrl = Const.EDITOR_URL;
    }


    componentDidMount() {

        //수정을 위해서 상태에 넣는다.
        this.setState({
            data: this.props.response.result[0].cnttPost,
            title: this.props.response.result[0].cnttTitle
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {

        //서버에서 예외 메시지를 던지면 화면에 표시한다.
        if (!nextProps.response.success) {
            this.setState({msg: nextProps.response.result[0]}, ()=>console.log(this.state.msg));
        }
    }

    handleList = () => {
        this.props.history.push('/list');
    }

    handleSave = () => {

        //console.log(this.state);

        const {data, title} = this.state;

        if (data.length === 0) {
            console.log('내용을 입력하십시오.');
            return;
        }

        if (title.length === 0) {
            console.log('제목을 입력하십시오.');
            this.titleRef.current.focus();
            return;
        }

        this.props.onModify(this.state);
        this.setState({msg: '💎'});

    }

    handleEditorChange = (event) => {
        this.setState( {data: event.editor.getData(), msg: Const.EDIT_MSG} );
    }

    handleChange = (event) => {
        this.setState( {title: event.target.value, msg: Const.EDIT_MSG} );
    }

    /*
    handleCancel = () => {

        this.setState({
            data: this.props.response.result[0].cnttPost,
            title: this.props.response.result[0].cnttTitle,
            msg: Const.EDIT_MSG
        });
    }
    */

    render() {

        return (
            <div className="form-main">
                <UserInfo userInfo={this.props.userInfo}/>
                <span style={{float: 'left', color: 'red'}}><b>{this.state.msg}</b></span>
                <div style={{textAlign: 'right'}}>
                    <button className="btn-normal" onClick={this.handleSave}>저장</button>{' '}
                    <button className="btn-normal">취소</button>{' '}
                    <button className="btn-normal" onClick={this.handleList}>목록</button>
                </div>
                <input type="text" className="input_title"  value={this.state.title} onChange={this.handleChange} ref={this.titleRef}/>
                <CKEditor
                    data={this.state.data}
                    onChange={this.handleEditorChange}
                />
            </div>
        )
    }
}

export default Modify;