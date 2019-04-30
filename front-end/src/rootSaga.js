import { all } from 'redux-saga/effects'
import { getListSaga, savePostSaga, getReadSaga, deletePostSaga, modifyPostSaga, loginSaga, logoutSaga, getDisclosedData } from './saga'

//all([effects])
//TODO 배열로 변경할 것
export default function* root() {
    const sagas = [ getListSaga(), savePostSaga(), getReadSaga(), deletePostSaga(), modifyPostSaga(), loginSaga(), logoutSaga(), getDisclosedData()];
    yield all(sagas);
}
