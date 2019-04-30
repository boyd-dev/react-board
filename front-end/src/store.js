import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import * as Const from './Const';


//Redux DevTools from chrome store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Composes functions from right to left.

const sagaMiddleware = createSagaMiddleware();

const defaultState = {
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
};

const preloadedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : defaultState;

//const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers (
        applyMiddleware(sagaMiddleware)
    )
);

// It will be called any time an action is dispatched,
// and some part of the state tree may potentially have changed.
store.subscribe(() => {
    //console.log(store.getState());
    //새로고침할 경우 상태가 초기화되므로 이를 localStorage 에 보관하기로 한다.
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});


sagaMiddleware.run(rootSaga);

export default store;
