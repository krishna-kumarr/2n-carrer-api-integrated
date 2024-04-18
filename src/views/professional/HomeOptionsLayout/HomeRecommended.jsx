import React, { useContext, useEffect, useState } from 'react'
import JobCard from '../../../layouts/dummyhome/JobCard'
import CommonContext from '../../../hooks/CommonContext';
import axios from "axios";
import Logo from '../../../assets/images/company.png'
import HomePagination from './HomePagination';
import toast from 'react-hot-toast';


const HomeRecommended = () => {
    const jobCards = ["dummy", "dummy", "dummy"];
    // pagination states 
    const [firstIndexValue, SetFirstIndexValue] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const RecordsPerPage = 10;
    // 
    const { refreshId, refreshAction, setRefreshAction, cardArray, setCardArray, cardArrayDuplicate, setCardArrayDuplicate, setSelectedCardData, gettingResponse, setGettingResponse } = useContext(CommonContext);

    useEffect(() => {
        if (refreshAction === false) {
            setGettingResponse(false)
            setCardArray([])
            setCardArrayDuplicate([])
            setSelectedCardData([])
        }

        const getHomeDatas = async () => {
            const token = localStorage.getItem("Token")
            try {
                await axios({
                    method: "get",
                    url: "https://api.2ndcareers.com/professional_dashboard",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        console.log(res.data)
                        setRefreshAction(false)
                        if (res.data.error_code === 0) {
                            if (res.data.data.job_details !== undefined) {
                                setCardArray(res.data.data.job_details)
                                setSelectedCardData([res.data.data.job_details[0]])

                                const firstIndex = RecordsPerPage * firstIndexValue;
                                const LastIndex = RecordsPerPage * firstIndexValue + RecordsPerPage;

                                var jobCards = res.data.data.job_details.slice(firstIndex, LastIndex)
                                setCardArrayDuplicate(jobCards)

                                const numberOfPage = Math.ceil(res.data.data.job_details.length / RecordsPerPage)
                                setPageCount(numberOfPage)

                                setGettingResponse(true)
                                toast.success(res.data.message)
                            }
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => console.log(err))
            }
            catch (err) {
                console.log(err)
            }
        }
        (async () => getHomeDatas())();
    }, [refreshId])

    return (
        <>
            <div className="col-lg-12 h-100 overflow-scroll">
                <div className="d-flex justify-content-between p-2 align-items-center">
                    <div className="col">
                        {
                            gettingResponse === false ? <label className="filter-results placeholder rounded py-3 w-50"></label>
                                :
                                <label className="filter-results">Showing : {cardArray.length} results</label>
                        }

                    </div>
                </div>


                {/* job card skeleton  */}
                {gettingResponse === false ?
                    jobCards.map((value, index) => {
                        return <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
                            <div className="card-body ">
                                <div className="d-flex align-items-center my-2">
                                    <div className="flex-shrink-0 placeholder rounded-circle pe-none">
                                        <img src={''} width={52} height={52} className='opacity-0' />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <p className='job-card-posted-time placeholder col-5 rounded py-3'></p>
                                        <h6 className='job-card-component-heading placeholder col-8 rounded py-2 pt-3'></h6>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between card-company-details-icon mt-4">
                                    <label className="fs-7 card-inner-details col-3">
                                        <span className='placeholder rounded py-2 pt-3 w-100'>

                                        </span>
                                    </label>
                                    <label className="fs-7 card-inner-details col-2">
                                        <span className='placeholder rounded py-2 pt-3 w-100'>

                                        </span>
                                    </label>
                                    <label className="fs-7 card-inner-details col-2">
                                        <span className='placeholder rounded py-2 pt-3 w-100'>

                                        </span>
                                    </label>
                                    <label className="fs-7 card-inner-details col-2">
                                        <span className='placeholder rounded py-2 pt-3 w-100'>

                                        </span>
                                    </label>
                                </div>
                                <p className='mt-4 job-card-description placeholder rounded skeleton-jobParagraph col-12'> </p>
                            </div>
                        </div>
                    })
                    :
                    null
                }

                {
                    cardArray.length > 0 && gettingResponse ?
                        cardArrayDuplicate.map((value, index) => {
                            return <div className="card w-100 mt-2 rounded-4 border-0">
                                <div className="card-body">
                                    <JobCard
                                        cardHeading={value.job_title}
                                        cardPostedOn={value.created_at}
                                        cardWorkplace={value.workplace_type}
                                        cardState={value.country}
                                        cardSchedule={value.work_schedule}
                                        cardJobType={value.job_type}
                                        cardPayment={value.is_paid === "Y" ? "Paid" : "Volunteer"}
                                        applicationStatus="ai"
                                        cardType="recommended"
                                        cardId={value.id}
                                        cardDes={value.job_overview}
                                    />
                                </div>
                            </div>

                        })

                        :
                        <div className="row align-items-center h-100 justify-content-center">
                            <p className='text-center'>hii</p>
                        </div>
                }



                {/* 
                {
                    cardArrayDuplicate.length > 0 ?
                        <div className="w-100 mt-3">
                            <HomePagination RecordsPerPage={RecordsPerPage} pageCount={pageCount} setPageCount={setPageCount} SetFirstIndexValue={SetFirstIndexValue} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                        :
                        null
                } */}
            </div>
        </>
    )
}

export default HomeRecommended
