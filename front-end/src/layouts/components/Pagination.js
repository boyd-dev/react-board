import React from "react";

//페이지네이션의 스타일을 위해 bootstrap 을 설치해야 한다.
//bootstrap-3.3.7-dist 를 /src/bootstrap 에 복사
import Pagination from "react-js-pagination"; //npm install react-js-pagination

import '../../bootstrap/css/bootstrap.css';

const Paging = ({activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onPageChange}) => {

    return (
        <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={onPageChange}
        />
    );
}

export default Paging;