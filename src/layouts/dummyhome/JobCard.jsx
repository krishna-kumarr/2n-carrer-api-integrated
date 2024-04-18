import React, { useContext, useEffect } from 'react'
import Logo from '../../assets/images/company.png'
import { FaShoppingBag, FaWallet } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import CommonContext from '../../hooks/CommonContext';
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';


const JobCard = ({ handleRemoveJob,cardName, cardId, cardDes, cardType, applicationStatus, cardHeading, cardPostedOn, cardWorkplace, cardState, cardSchedule, cardJobType, cardPayment }) => {

  const { setRefreshAction,setSelectedCardData, setSelectedSkeleton } = useContext(CommonContext);



  const handleSelectedCardData = async (cardId) => {
    setSelectedCardData([])
    setSelectedSkeleton(true)
    setRefreshAction(false)

    const token = localStorage.getItem("Token")

    let jobId = { job_id: cardId }
    try {
      await axios.post("https://api.2ndcareers.com/selected_job_details", jobId, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.error_code === 0) {
            console.log("selected_job_details", res.data.data)
            setSelectedCardData(res.data.data)
            setSelectedSkeleton(false)

            // toast.success(res.data.message)
          }
          else if (res.data.error_code === 500) {
            setSelectedSkeleton(false)
          }
          else{
            toast.error(res.data.message)
          }
        })
        .catch((err) => console.log(err))
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <div>
      <div className="d-flex align-items-center my-2" >
        <div className="flex-shrink-0">
          <img src={Logo} alt="..." width={52} height={52} className='pe-none' />
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className='job-card-component-heading'>{cardHeading}</h6>
          <p className='job-card-posted-time m-0'>Posted on {cardPostedOn}</p>
        </div>

        {/* Applied job cards  */}
        {
          cardType === "applied" ?
            <div className='flex-shrink-0'>
              <div
                className={`py-1 px-3 rounded-1 
                ${applicationStatus === "reviewed" ? 'job-reviewed' : null ||
                    applicationStatus === "shortlisted" ? 'job-shortlisted' : null ||
                      applicationStatus === "contacted" ? 'job-contacted' : null ||
                        applicationStatus === "rejected" ? 'job-rejected' : null
                  }`
                }
              >

                <p className='m-0'>{applicationStatus === "reviewed" ? 'reviewed' : null ||
                  applicationStatus === "shortlisted" ? 'shortlisted' : null ||
                    applicationStatus === "contacted" ? 'contacted' : null ||
                      applicationStatus === "rejected" ? 'Not selected by Employer' : null
                }</p>
              </div>
            </div>
            :
            null
        }


        {/* recommended job cards  */}
        {
          cardType === "recommended" ?
            <div className='flex-shrink-0'>
              <div
                className={`py-1 px-3 rounded-1 
                ${applicationStatus === "ai" ? 'job-reviewed' : null ||
                    applicationStatus === "manual" ? 'job-shortlisted' : null
                  }`
                }
              >

                <p className='m-0'>{applicationStatus === "manual" ? 'Manual Recommendation' : null ||
                  applicationStatus === "ai" ? 'AI Recommendation' : null
                }</p>
              </div>
            </div>
            :
            null
        }

        {
          cardName === "saved" ?
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={()=>handleRemoveJob(cardId)}>
              <MdDeleteOutline className='fs-5' /> Remove
            </button>
            :
            null
        }


      </div>
      <div onClick={() => handleSelectedCardData(cardId)} className='cursorPointer'>
        <div className="d-flex justify-content-around card-company-details-icon mt-4">
          <label className="fs-7 card-inner-details">
            <FaLocationDot className="me-2 text-success" />
            {cardWorkplace}-{cardState}
          </label>
          <label className="fs-7 card-inner-details">
            <FaShoppingBag className="me-2 text-warning" />
            {cardSchedule}
          </label>
          <label className="fs-7 card-inner-details">
            <IoTimeSharp className="me-2 text-primary" />
            {cardJobType}
          </label>
          <label className="fs-7 card-inner-details">
            <FaWallet className="me-2 text-warning" />
            {cardPayment}
          </label>
        </div>
        <p className='mt-4 job-card-description'>{cardDes}</p>
      </div>
    </div>
  )
}

export default JobCard