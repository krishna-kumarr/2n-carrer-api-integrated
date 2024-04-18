import React, { useContext, useEffect, useState } from "react";
import JobCard from "../../../layouts/dummyhome/JobCard";
import CommonContext from "../../../hooks/CommonContext";
import axios from "axios";
import Logo from "../../../assets/images/company.png";
import HomePagination from "./HomePagination";
import toast from "react-hot-toast";

const HomeApplied = () => {
  const [filter, setFilter] = useState("");
  // pagination states 
  const [firstIndexValue, SetFirstIndexValue] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const RecordsPerPage = 10;
  // 
  const {
    cardArrayDuplicate,
    setCardArrayDuplicate,
    cardArray,
    setCardArray,
    setSelectedCardData,
    gettingResponse,
    setGettingResponse,
    setRefreshAction,
    refreshId,
    refreshAction
  } = useContext(CommonContext);
  const jobCards = [
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy"
  ];



  useEffect(() => {
    if (refreshAction === false) {
      setGettingResponse(false);
      setCardArray([]);
      setCardArrayDuplicate([]);
      setSelectedCardData([]);
    }
    const getHomeDatas = async () => {
      const token = localStorage.getItem("Token");
      try {
        await axios({
          method: "get",
          url: "https://api.2ndcareers.com/professional_applied_jobs",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setRefreshAction(false)
            console.log(res.data)
            if (res.data.error_code === 0) {
              if (res.data.data[0].job_details !== undefined) {
                console.log(res.data.data[0].job_details[0])

                setSelectedCardData([res.data.data[0].job_details[0]])

                setCardArray(res.data.data[0].job_details)

                const firstIndex = RecordsPerPage * firstIndexValue;
                const LastIndex = RecordsPerPage * firstIndexValue + RecordsPerPage;

                var jobCards = res.data.data[0].job_details.slice(firstIndex, LastIndex)
                setCardArrayDuplicate(jobCards)

                const numberOfPage = Math.ceil(res.data.data[0].job_details.length / RecordsPerPage)
                setPageCount(numberOfPage)

                setGettingResponse(true)
                toast.success(res.data.message)

              }
              else {
                setGettingResponse(true);
              }
            } else {
              toast.error(res.data.message)
            }
          })
          .catch((err) => console.log(err));

      } catch (err) {
        console.log(err);
      }
    };
    (async () => getHomeDatas())();
  }, [refreshId]);




  const handleSortingFilter = (sortValue) => {
    if (cardArray.length > 0) {
      setFilter(sortValue)
      switch (sortValue) {
        case "DateLatest":
          var sorting = cardArray.sort(function (a, b) {
            let d1 = new Date(a.created_at),
              d2 = new Date(b.created_at)
            if (d1 < d2) {
              return -1;
            }
          })
          setCurrentPage(0)

          var jobCards = sorting.slice(0, RecordsPerPage)
          setCardArrayDuplicate(jobCards)

          setCardArray(sorting)
          break;
        case "NameAscending":
          var sorting = cardArray.sort(function (a, b) {
            if (a.job_title.toLowerCase() < b.job_title.toLowerCase()) {
              return -1;
            }
          })
          setCurrentPage(0)

          var jobCards = sorting.slice(0, RecordsPerPage)
          setCardArrayDuplicate(jobCards)

          setCardArray(sorting)
          break;
        case "NameDescending":
          var sorting = cardArray.sort(function (a, b) {
            if (b.job_title.toLowerCase() < a.job_title.toLowerCase()) {
              return -1;
            }
          })
          setCurrentPage(0)

          var jobCards = sorting.slice(0, RecordsPerPage)
          setCardArrayDuplicate(jobCards)

          setCardArray(sorting)
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className="col-lg-12 h-100 overflow-scroll p-0">
      <div className="d-flex justify-content-between p-2 align-items-center">
        <div className="col">
          {gettingResponse === false ? (
            <label className="filter-results placeholder rounded py-3 w-50"></label>
          ) : (
            <label className="filter-results">
              Showing : {cardArray.length} results
            </label>
          )}
        </div>
        <div className="col dropdown custom-dropdown">
          {gettingResponse === false ? (
            <label className=" w-100">
              <span className="placeholder w-100 rounded py-2 pt-3"></span>
            </label>
          ) : (
            <>
              <button
                className="btn btn-secondary dropdown-toggle w-100 border-0 outline-none filter-section"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filter === "" ? "Filter" : filter}
              </button>
              <ul className="dropdown-menu col">
                <li onClick={() => handleSortingFilter("DateLatest")}>
                  <a className="dropdown-item">Sort by Date Latest</a>
                </li>
                <li onClick={() => handleSortingFilter("NameAscending")}>
                  <a className="dropdown-item">Sort by Ascending(A-Z) </a>
                </li>
                <li onClick={() => handleSortingFilter("NameDescending")}>
                  <a className="dropdown-item">Sort by Descending(Z-A) </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* job card skeleton  */}
      {gettingResponse === false ? (
        jobCards.map((value, index) => {
          return (
            <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
              <div className="card-body">
                <div className="d-flex align-items-center my-2">
                  <div className="flex-shrink-0 placeholder rounded-circle pe-none">
                    <img src={''} width={52} height={52} className='opacity-0' />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="job-card-posted-time placeholder col-5 rounded py-3"></p>
                    <h6 className="job-card-component-heading placeholder col-8 rounded py-2 pt-3"></h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between card-company-details-icon mt-4">
                  <label className="fs-7 card-inner-details col-3">
                    <span className="placeholder rounded py-2 pt-3 w-100"></span>
                  </label>
                  <label className="fs-7 card-inner-details col-2">
                    <span className="placeholder rounded py-2 pt-3 w-100"></span>
                  </label>
                  <label className="fs-7 card-inner-details col-2">
                    <span className="placeholder rounded py-2 pt-3 w-100"></span>
                  </label>
                  <label className="fs-7 card-inner-details col-2">
                    <span className="placeholder rounded py-2 pt-3 w-100">
                      {" "}
                    </span>
                  </label>
                </div>
                <p className="mt-4 job-card-description placeholder rounded skeleton-jobParagraph col-12">
                  {" "}
                </p>
              </div>
            </div>
          );
        })
      ) : cardArrayDuplicate.length > 0 ? (
        cardArrayDuplicate.map((value, index) => {
          return (
            <div className="card w-100 mt-2 rounded-4 border-0">
              <div className="card-body">
                <JobCard
                  cardHeading={value.job_title}
                  cardPostedOn={value.created_at}
                  cardWorkplace={value.workplace_type}
                  cardState={value.country}
                  cardSchedule={value.work_schedule}
                  cardJobType={value.job_type}
                  cardPayment={value.is_paid === "Y" ? "Paid" : "Volunteer"}
                  applicationStatus="contacted"
                  cardType="applied"
                  cardId={value.id}
                  cardDes={value.job_overview}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="row align-items-center h-100 justify-content-center">
          <p className="text-center">No records found</p>
        </div>
      )}



      {
        cardArray.length > RecordsPerPage ?
          <div className="w-100 mt-3">
            <HomePagination RecordsPerPage={RecordsPerPage} pageCount={pageCount} setPageCount={setPageCount} SetFirstIndexValue={SetFirstIndexValue} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
          :
          null
      }
    </div>
  );
};

export default HomeApplied;
