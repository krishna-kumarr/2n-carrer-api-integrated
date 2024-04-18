import React, { useContext, useEffect, useState } from 'react'
import CommonContext from '../../../hooks/CommonContext';
import ReactPaginate from 'react-paginate';

const HomePagination = ({RecordsPerPage,pageCount,setPageCount,SetFirstIndexValue,currentPage,setCurrentPage}) => {
    const { setCardArrayDuplicate,cardArray } = useContext(CommonContext);


    const handlePageClick = (value) => {
        SetFirstIndexValue(value.selected)
        setCurrentPage(value.selected)
        const firstIndex = RecordsPerPage * value.selected;
        const LastIndex = RecordsPerPage * value.selected + RecordsPerPage;

        var jobCards = cardArray.slice(firstIndex, LastIndex)
        setCardArrayDuplicate(jobCards)

        const numberOfPage = Math.ceil(cardArray.length / RecordsPerPage)
        setPageCount(numberOfPage)
    }


    return (
        <>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={'...'}
                pageCount={Math.ceil(pageCount)}
                forcePage={currentPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link "}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}

            />
        </>
    )
}

export default HomePagination
