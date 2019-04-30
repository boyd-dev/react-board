import { connect } from 'react-redux';
import Read from './components/Read';
import { deletePost } from '../actions';

const mapStateToProps = (state) => {

    return {
        id: state.id,
        response: state.response,
        userInfo: state.userInfo,
        pageNo: state.pageNo,
        error: state.error
    };
};


const mapDispatchToProps = (dispatch) => (
    {
        onDelete: (params) => {dispatch(deletePost(params))}
    }
);

const ReadContainer = connect(mapStateToProps, mapDispatchToProps)(Read);

export default ReadContainer;