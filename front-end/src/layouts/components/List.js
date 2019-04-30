import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import Loader from 'react-loader-spinner'; //npm install react-loader-spinner
import Pagination from './Pagination';
import MainButton from '../MainButton';
import { UserInfo } from '../UserInfo';

import '../../App.css';


class List extends Component {

    constructor(props) {

        super(props);

        this.state = {

            gridOptions: {
                columnDefs: [
                    {headerName: "번호",  width: 70,  field: "cnttId"},
                    {headerName: "제목",  width: 300, field: "cnttTitle"},
                    {headerName: "작성자", width: 120, field: "authorId"},
                    {headerName: "작성일", width: 90, field: "updtTm",  valueFormatter: function (params) {

                            //console.log(params.value);
                            //console.log(new Date(params.value).toISOString().slice(0, 19).replace('T', ' '));
                            //MySQL 의 DATE 타입에서 일자만 추출
                            let d = '';
                            if (params.value !== undefined) {
                                d = new Date(params.value).toISOString().slice(0, 19).replace('T', ' ').substr(0,10);
                            }
                            return d;
                        }
                    },
                    {headerName: "조회수", width: 70, field: "cnttHit", type: "numericColumn"}
                ],
                defaultColDef:{
                    sortable:true,
                    resizable: true
                },
                rowData: [],
                rowSelection: 'single',
                pagination: false,
                paginationPageSize: 10,
                /*
                onGridReady: function (params) {
                    //params.api.sizeColumnsToFit();
                },
                */
                onRowDoubleClicked: function (params) {

                    const data = params.api.getSelectedNodes()[0].data;
                    //console.log('CNTT_ID=' + data.cnttId);
                    props.onSelectRead(data.cnttId);
                }
            },
            rowData: []

        }
    }

    //게시물 선택 후 이동
    //선택이 되면 상태 state.id 가 변경될 것이다.
    /*
    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.id !== this.props.id) {
            if (nextProps.id > 0 && !nextProps.pending) {
                this.props.history.push('/read');
            }
        }
    }
    */

    //componentWillReceiveProps 와 동일한 결과
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.id !== this.props.id) {
            if (this.props.id > 0 && !this.props.pending) {
                this.props.history.push('/read');
            }
        }
    }

    componentDidMount() {

        /*
        const rowData = [
            {cnttId: 11, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 12, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 13, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 14, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 15, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 16, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 17, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 18, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 19, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 20, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 21, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 22, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 23, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 24, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12},
            {cnttId: 25, cnttTitle: '제목을 입력합니다.', authorId: 'Kate', updtTm: '20190401', cnttHit: 12}
        ];

        this.setState({...this.state.rowData, rowData});
        */

        this.props.onSearchList({pageNo: this.props.pageNo});
    }


    onGridReady = (params) => {
        //다음 경고 때문에 조건을 추가
        //ag-Grid: tried to call sizeColumnsToFit() but the grid is coming back with zero width...
        // read 로 이동하면서 sizeColumnsToFit 가 실행되면서 발생
        if (this.props.id === -1) params.api.sizeColumnsToFit();
    }

    handlePost = () => {
        this.props.history.push('/post');
    }

    handlePageChange = (pageNo) => {
        this.props.onSearchList({pageNo});
    }

    handleList = () => {
        this.props.history.push('/list');
    }

    render() {

        //AgGridReact rowData
        //TypeError: Cannot read property 'result' of null
        //콘솔에서 확인하면 객체로 나오는데 해당 속성이 없다는 오류가 발생하는 경우가 있다.
        //이것은 리덕스에서 설정한 상태를 적절하게 초기화를 해주지 않았기 때문이다.
        //reducer 의 initialState 에서 response: null 과 response: {} 를 비교해본다.
        //console.log( this.props.response.result );

        if (this.props.pending) {
            return (
                <div style={{textAlign: 'center', marginTop: '200px'}}>
                    <Loader type="Oval" color="#CE62D4" height="80" width="80"/>
                </div>
            )
        }

        return (
            <div className="ag-theme-balham form-main">
                <UserInfo userInfo={this.props.userInfo}/>
                <span style={{float: 'left', fontSize:'16px'}}>
                    Total <b>{this.props.totalCount}</b>
                </span>
                <div style={{textAlign: 'right'}}>
                    <button className="btn-normal" onClick={this.handleList}>조회</button>{' '}
                    <button className="btn-normal" onClick={this.handlePost}>글쓰기</button>
                </div>
                <AgGridReact
                    gridOptions={this.state.gridOptions}
                    rowData={this.props.response && this.props.response.result}
                    onGridReady={this.onGridReady}>
                </AgGridReact>

                <div style={{textAlign: 'center'}}>
                    <MainButton/>
                    <Pagination activePage={this.props.pageNo}
                                itemsCountPerPage={this.props.recordCountPerPage}
                                totalItemsCount={this.props.totalCount}
                                pageRangeDisplayed={this.props.pageListSize}
                                onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default List;
