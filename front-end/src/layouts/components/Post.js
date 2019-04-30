import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import * as Const from '../../Const';


import '../../App.css';
import {UserInfo} from "../UserInfo";

class Post extends Component {

    state = {data: '', title: '', msg: ''}

    constructor(props) {

        super(props);

        this.titleRef = React.createRef();

        CKEditor.editorUrl = Const.EDITOR_URL;

    }

    //저장 후 목록 이동
    componentWillReceiveProps(nextProps, nextContext) {

        //console.log(nextProps.response);
        if (nextProps.response.success) {
            this.props.history.push('/list');

        //서버에서 예외 메시지를 던지면 화면에 표시한다.
        } else {
            this.setState({msg: nextProps.response.result[0]}, ()=>console.log(this.state.msg));
        }
    }


    handleList = () => {
        this.props.history.push('/list');
    }

    handleSave = () => {

        const {data, title} = this.state;

        if (data.length === 0) {
            //console.log('내용을 입력하십시오.');
            return;
        }

        if (title.length === 0) {
            //console.log('제목을 입력하십시오.');
            this.titleRef.current.focus();
            return;
        }

        this.props.onSave(this.state);

    }

    handleEditorChange = (event) => {
        this.setState( {data: event.editor.getData()} );
    }


    handleChange = (event) => {
        this.setState( {title: event.target.value} );
    }

    handleReset = () => {
        this.setState( { data: '', title: '', msg: ''} );
    }

    render() {


        return (
            <div className="form-main">
                <UserInfo userInfo={this.props.userInfo}/>
                <span style={{float: 'left', color: 'red'}}><b>{this.state.msg}</b></span>
                <div style={{textAlign: 'right'}}>
                    <button className="btn-normal" onClick={this.handleSave}>저장</button>{' '}
                    <button className="btn-normal" onClick={this.handleReset}>취소</button>{' '}
                    <button className="btn-normal" onClick={this.handleList}>목록</button>
                </div>
                <input type="text" className="input_title" placeholder="제목을 입력하십시오." value={this.state.title} onChange={this.handleChange} ref={this.titleRef}/>
                <CKEditor
                    data={this.state.data}
                    onChange={this.handleEditorChange}
                />

            </div>
        )
    }


}

export default Post;