import { put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import * as actionCreators from '../actions';
import { uport } from '../utils/connectors'


function* requestCredentials() {

    const requestingUserInfo = { requested: ['name'], notifications: true, accountType: 'general' };

    //사용자 신원정보를 요청을 시작한다.
    yield call([uport, 'requestDisclosure'], requestingUserInfo);

    //사용자 신원정보가 리턴되기를 기다린다.
    //uport 모바일 앱에서 인증한다.
    const credentials = yield call([uport, 'onResponse'], 'disclosureReq');

    yield put(actionCreators.uportDisclosedData(credentials.payload));
}

function* processDisclosedData(action) {

    console.log(action.credentials);
    // Something to do?
    // 특별히 할 일이 없다.
}

function* userDataCleared() {
    uport.logout();
}


function* getDisclosedData() {

    yield takeEvery('@uport/DISCLOSURE_RECEIVED', processDisclosedData);
}


function* loginSaga() {

    yield takeLatest('@uport/REQUEST_DISCLOSURE', requestCredentials);
}

function* logoutSaga() {

    yield takeLatest('@uport/USER_DATA_CLEARED', userDataCleared);
}


export default [
    loginSaga,
    logoutSaga,
    getDisclosedData
];
