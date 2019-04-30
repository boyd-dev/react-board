import {connect} from 'react-redux';
import Post from './components/Post';
import {savePost} from '../actions';

const mapStateToProps = (state) => {

    return {
        response: state.response,
        userInfo: state.userInfo,
        error: state.error
    };
};


const mapDispatchToProps = (dispatch) => (
    {
        onSave: (params) => {dispatch(savePost(params))}
    }
);

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Post);

export default PostContainer;