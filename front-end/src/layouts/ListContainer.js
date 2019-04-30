import {connect} from 'react-redux';
import List from './components/List';
import {getList, getRead} from '../actions';

const mapStateToProps = (state) => {

    return {
        id: state.id,
        response: state.response,
        totalCount: state.totalCount,
        recordCountPerPage: state.recordCountPerPage,
        pageListSize: state.pageListSize,
        pageNo: state.pageNo,
        userInfo: state.userInfo,
        pending: state.pending,
        error: state.error
    };
};


const mapDispatchToProps = (dispatch) => (
    {
        onSearchList: (params) => {dispatch(getList(params))},
        onSelectRead: (params) => {dispatch(getRead(params))}
    }
);

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListContainer;