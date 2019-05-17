import { all, fork } from 'redux-saga/effects'
import { BoardSaga, LoginSaga } from './saga'

//all([effects])
//all 은 여러 effects 를 병렬적으로 실행하도록 결합한다.

export default function* root() {
    const sagas = [ ...BoardSaga.map(saga => saga()), ...LoginSaga.map(saga=> saga()) ];
    yield all(sagas);
}
