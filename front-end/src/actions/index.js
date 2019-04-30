
//목록 조회
export const getList = (params) => ({type: 'GET_LIST', payload: params});
export const getListSuccess = (response) => ({type: 'GET_LIST_SUCCESS', response});

//저장
export const savePost = (params) => ({type: 'SAVE_POST', payload: params});
export const savePostSuccess = (response) => ({type: 'SAVE_POST_SUCCESS', response});

//게시물 조회
export const getRead = (params) => ({type: 'READ_POST', payload: params});
export const getReadSuccess = (response) => ({type: 'READ_POST_SUCCESS', response});

//삭제
export const deletePost = (params) => ({type: 'DELETE_POST', payload: params});
export const deletePostSuccess = (response) => ({type: 'DELETE_POST_SUCCESS', response});

//수정
export const modifyPost = (params) => ({type: 'MODIFY_POST', payload: params});
//수정 후에는 SAVE_POST_SUCCESS 를 디스패치하기로 한다.


export const getFailure = (error) => ({type: 'GET_FAILURE', error});


//uPort 로그인 액션
//uPort 액션을 prefix @uport 로 구분하기로 한다.
export const uportLogin = () => ({type: '@uport/REQUEST_DISCLOSURE'});
export const uportLogout = () => ({type: '@uport/USER_DATA_CLEARED'});
export const uportDisclosedData = (credentials) => ({type: '@uport/DISCLOSURE_RECEIVED', credentials});
