import * as Const from "../Const";
/*
const initialState = {
    response: {},
    id: -1,
    totalCount: 0,
    recordCountPerPage: Const.RECORD_COUNT_PER_PAGE,
    pageListSize: Const.PAGE_LIST_SIZE,
    pageNo: 1,
    loggedIn: false,
    userInfo: {name: '', did: ''}, //사용자 정보는 이름(uport 에서 설정하는 name) 사용
    pending: false,
    error: false
}
*/
function post(state, action) {


    switch (action.type) {

        case 'GET_LIST':

            return Object.assign({}, state, {
                pageNo: action.payload.pageNo,
                pending: true,
                error: false
            });

        case 'GET_LIST_SUCCESS':

            return {
                ...state,
                pending: false,
                response: action.response.data,
                id: -1, //목록으로 이동할 때마다 이전에 선택된 게시물 번호를 초기화한다.
                totalCount: action.response.data.count
            };

        case 'SAVE_POST' :

            return {
                ...state,
                pending: true,
                error: false
            };

        case 'SAVE_POST_SUCCESS' :

            return {
                ...state,
                pending: false,
                response: action.response.data
            };

        case 'DELETE_POST' :

            return {
                ...state,
                pending: true,
                error: false
            };

        case 'DELETE_POST_SUCCESS' :

            return {
                ...state,
                pending: false,
                response: action.response.data,
                pageNo: 1 //삭제 후에는 1페이지로 이동하는 것이 안전하다.
            };

        case 'READ_POST' :

            return {
                ...state,
                pending: true,
                error: false
            };

        case 'READ_POST_SUCCESS':

            return {
                ...state,
                pending: false,
                response: action.response.data,
                id: action.response.data.result[0].cnttId
            };

        case '@uport/DISCLOSURE_RECEIVED':

            return {
                ...state,
                pending: false,
                loggedIn: true,
                userInfo: {...state.userInfo, name: action.credentials.name, did: action.credentials.did}
            };

        case '@uport/USER_DATA_CLEARED':

            return {
                ...state,
                loggedIn: false,
                userInfo: {...state.userInfo, name: '', did: ''}
            };

        //로직 오류가 아닌 모든 예외
        case 'GET_FAILURE':

            return {
                ...state,
                pending: false,
                error: true
            };

        case '@uport/REQUEST_DISCLOSURE':
            return {
              ...state,
              pending: true
            }


        default:
            return state;
    }
};

export default post;
