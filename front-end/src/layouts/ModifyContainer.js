import {connect} from 'react-redux';
import Modify from './components/Modify';
import {modifyPost} from '../actions';

const mapStateToProps = (state) => {

    return {
        id: state.id,
        response: state.response,
        userInfo: state.userInfo,
        pending: state.pending,
        error: state.error
    };
};


const mapDispatchToProps = (dispatch) => (
    {
        onModify: (params) => {dispatch(modifyPost(params))}
    }
);

const ModifyContainer = connect(mapStateToProps, mapDispatchToProps)(Modify);

export default ModifyContainer;