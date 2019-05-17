import axios from 'axios';
import { put, takeEvery, takeLatest, call, select } from 'redux-saga/effects';
import * as actionCreators from '../actions';
import * as Const from '../Const';

//worker saga
function* getList(action) {

    const state = yield select();

    const limit = state.recordCountPerPage;
    const pageNo = action.payload.pageNo;

    try {

        const response = yield call(axios.get, `/api?limit=${limit}&pageNo=${pageNo}`);
        yield put(actionCreators.getListSuccess(response));

    } catch(error) {
        yield put(actionCreators.getFailure());
    }

}

function* savePost(action) {

    const state = yield select();

    let name = Const.DUMMY_USER;
    let did = Const.DUMMY_USER;
    if (Object.getOwnPropertyNames(state.userInfo).length > 0 && state.userInfo.name !== '') {
        name = state.userInfo.name;
        did = state.userInfo.did;
    }

    const post = {
        cnttTitle: action.payload.title,
        cnttPost: action.payload.data,
        authorId: name,
        did: did
    }

    try {
        const response = yield call(axios.post, `/api/`, post);
        yield put(actionCreators.savePostSuccess(response));
    } catch(error) {
        yield put(actionCreators.getFailure()); //
    }
}

function* readPost(action) {

    const id = action.payload;

    try {
        const response = yield call(axios.get, `/api/${id}`);
        yield put(actionCreators.getReadSuccess(response));
    } catch(error) {
        yield put(actionCreators.getFailure());
    }
}

function* deletePost(action) {

    const id = action.payload;
    const state = yield select();

    let did = Const.DUMMY_USER;

    if (Object.getOwnPropertyNames(state.userInfo).length > 0 && state.userInfo.name !== '') {
        did = state.userInfo.did;
    }

    //axios.delete 는 param 을 키로 전달해야 한다.
    const post = {params: { did: did }};

    try {
        const response = yield call(axios.delete, `/api/${id}`, post);
        yield put(actionCreators.deletePostSuccess(response));
    } catch(error) {
        yield put(actionCreators.getFailure());
    }
}

function* modifyPost(action) {

    const state = yield select();
    const id = state.id;

    let name = 'foo';
    let did = 'foo';
    if (Object.getOwnPropertyNames(state.userInfo).length > 0 && state.userInfo.name !== '') {
        name = state.userInfo.name;
        did = state.userInfo.did;
    }

    const post = {cnttTitle: action.payload.title,
        cnttPost: action.payload.data,
        authorId: name,
        did: did
    }

    try {
        const response = yield call(axios.patch, `/api/${id}`, post);
        yield put(actionCreators.savePostSuccess(response));
    } catch(error) {
        yield put(actionCreators.getFailure());
    }

}


//watcher saga
function* getListSaga() {
    yield takeLatest('GET_LIST', getList);
}

function* savePostSaga() {
    yield takeLatest('SAVE_POST', savePost);
}

function* getReadSaga() {
    yield takeLatest('READ_POST', readPost);
}

function* deletePostSaga() {
    yield takeLatest('DELETE_POST', deletePost);
}

function* modifyPostSaga() {
    yield takeLatest('MODIFY_POST', modifyPost);
}


export default [
    getListSaga,
    savePostSaga,
    getReadSaga,
    deletePostSaga,
    modifyPostSaga
];
