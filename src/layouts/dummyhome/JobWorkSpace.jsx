import React, { useContext, useEffect, useRef, useState } from "react";
import JobDescription from "./JobDescription";
import Logo from "../../assets/images/company.png";
import { FaSave } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { FaLinkedin, FaTelegram, FaFacebook } from "react-icons/fa6";
import { IoMailOpen, IoLogoWhatsapp } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { LuUpload } from "react-icons/lu";
import CommonContext from "../../hooks/CommonContext";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";

const JobWorkSpace = () => {
  const { refreshId, setRefreshId, refreshAction, setRefreshAction, cardArray, selectedCardData, gettingResponse, selectedSkeleton, answers, setAnswer } = useContext(CommonContext);
  const [questionModal, setQuestionModal] = useState(false)
  const [modalBoxErr, setModalBoxErr] = useState(false)
  const [resumeData, setResumeData] = useState([])
  const [resumeSelected, setResumeSelected] = useState(false)
  const [coverLetterData, setCoverLetterData] = useState([])
  const inputFile = useRef(null);
  const [textCopy, setTextCopy] = useState('https://secondCareers/home/')


  useEffect(() => {
    setQuestionModal(false)
    setAnswer([])

    if (selectedCardData[0] !== undefined) {
      if (selectedCardData[0].questions !== undefined) {
        if (selectedCardData[0].questions.length > 0 && selectedCardData[0].questions[0] !== null) {
          if (selectedCardData[0].questions[0].custom_pre_screen_ques !== undefined) {
            setQuestionModal(true)
            console.log(selectedCardData[0].questions[0].custom_pre_screen_ques)
            console.log(selectedCardData)

            selectedCardData[0].questions.map((v) => {
              setAnswer(prevState => [...prevState, { question_id: v.id, answer: '' }])
            })
          }
        }
      } else {
        setQuestionModal(false)
        setAnswer([])
      }
    }
  }, [selectedCardData])


  const handleReset = () => {
    setResumeData([])
    setCoverLetterData([])
    setModalBoxErr(false)
  };

  const handleCopytext = () => {
    navigator.clipboard.writeText(textCopy)
    toast.success("Text copied")
  }

  const handleSaveJob = async (value) => {
    let jobSaveParams = { job_id: value }

    const token = localStorage.getItem("Token")
    try {
      await axios.post("https://api.2ndcareers.com/professional_job_save", jobSaveParams, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log("selectedCardData", selectedCardData)
          setRefreshId(value)
          setRefreshAction(true)
          if (res.data.error_code === 0) {
            toast.success(res.data.message)
          }
          if (res.data.error_code === 403) {
            toast.error(res.data.message)
          }
        })
        .catch((err) => console.log(err))
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSaveResume = (e) => {
    if (e.target.files[0] !== undefined) {
      setResumeData([e.target.files[0]])
      setResumeSelected(true)
    }
  }

  const handleSaveCoverLetter = (e) => {
    if (e.target.files[0] !== undefined) {
      setCoverLetterData([e.target.files[0]])
    }
  }

  const handleAnswer = (event, questionId) => {
    const editAnswer = answers.map((v) => {
      return v.question_id === questionId ? { ...v, answer: event.target.value } : v
    })

    setAnswer(editAnswer)
  }

  const handleFormDataApplyJob = async (e) => {
    e.preventDefault();
    const checkAnswers = answers.filter((v) => {
      return v.answer.length === 0
    })

    if ((checkAnswers.length === 0 && resumeData.length > 0 && coverLetterData.length > 0 && selectedCardData[0].required_resume === "Y" && selectedCardData[0].required_cover_letter === "Y") ||
      (resumeData.length > 0 && coverLetterData.length > 0 && selectedCardData[0].required_resume === "Y" && selectedCardData[0].required_cover_letter === "Y") ||
      (resumeData.length > 0 && selectedCardData[0].required_resume === "Y" && selectedCardData[0].required_cover_letter === "N") ||
      (coverLetterData.length > 0 && selectedCardData[0].required_resume === "N" && selectedCardData[0].required_cover_letter === "Y")) {

      setModalBoxErr(false)
      const fd = new FormData();
      fd.append("resume", selectedCardData[0].required_resume === "Y" ? resumeData[0] : 'none')
      fd.append("cover_letter", selectedCardData[0].required_cover_letter === "Y" ? coverLetterData[0] : 'none')
      fd.append("job_id", selectedCardData[0].id)

      answers.forEach((obj, index) => {
        Object.entries(obj).forEach(([key, value]) => {
          fd.append(`questions_list[${index}][${key}]`, value);
        });
      });

      try {
        const token = localStorage.getItem("Token")
        await axios.post("https://api.2ndcareers.com/professional_job_apply", fd, {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`
          }
        })
          .then((res) => {
            console.log(res)
            setRefreshId(selectedCardData[0].id)
            setRefreshAction(true)
            if (res.data.error_code === 0) {
              toast.success(res.data.message)
            } else {
              toast.error(res.data.message)
            }

          })
          .catch((err) => console.log(err))
      }
      catch (err) {
        console.log(err)
      }
    } else {
      setModalBoxErr(true)
    }
  }

  const handleNoRequirementsApplyJob = async () => {
    const fd = new FormData();
    fd.append("resume", 'none')
    fd.append("cover_letter", 'none')
    fd.append("job_id", selectedCardData[0].id)


    answers.forEach((obj, index) => {
      Object.entries(obj).forEach(([key, value]) => {
        fd.append(`questions_list[${index}][${key}]`, value);
      });
    });

    try {
      const token = localStorage.getItem("Token")
      await axios.post("https://api.2ndcareers.com/professional_job_apply", fd, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setRefreshId(selectedCardData[0].id)
          setRefreshAction(true)

          if (res.data.error_code === 0) {
            toast.success(res.data.message)

          }
          else if (res.data.error_code === 201) {
            toast.error(res.data.message)
          }
          else {
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
    <div className="container-fluid">
      <div className="row mt-1 setting-row-height p-3 overflow-hidden">

        <div className="h-100 col-12 col-lg-6  overflow-scroll d-flex">
          <Outlet />
        </div>


        <div className="d-none d-lg-inline col-lg-6 h-100 overflow-scroll">
          <div className="card w-100 border-0 bg-transparent h-100">
            {
              selectedCardData.length > 0 && cardArray.length > 0 && gettingResponse && !selectedSkeleton ?
                <div className="card-body p-0">
                  <div className="col-12 JobDescription-sticky-top-height bg-white rounded-4">
                    <div className="d-flex align-items-center my-2">
                      <div className="flex-shrink-0 ms-2">
                        <img src={Logo} alt="..." width={52} height={52} />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="job-heading" data-testid='DataQualityManager'>{selectedCardData[0].job_title !== undefined ? selectedCardData[0].job_title : ''}</h3>
                        <p className="job-posted-on m-0">Posted on {selectedCardData[0].created_at !== undefined ? selectedCardData[0].created_at : ''}</p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="me-auto ms-5 p-2">
                        {
                          selectedCardData[0].applied_status === "applied" ?
                            <button className="btn btn-brand-color ms-3 pe-none">Applied</button>
                            :
                            selectedCardData[0].required_resume === "Y" || selectedCardData[0].required_cover_letter === "Y" || (selectedCardData[0].questions[0] !== null && selectedCardData[0].questions.length > 0) ?
                              <button className="btn btn-brand-color ms-3" data-testid="ApplyNow" data-bs-toggle="modal" data-bs-target="#ApplyJobModal" onClick={handleReset}>Apply Now</button>
                              :
                              <button className="btn btn-brand-color ms-3" onClick={handleNoRequirementsApplyJob}>Apply Now</button>
                        }
                      </div>


                      <div className="p-2">
                        {selectedCardData[0].saved_status !== undefined ?

                          selectedCardData[0].saved_status === "saved" ?
                            <button type="button" className="btn btn-secondary pe-none">
                              <FaSave /> Saved
                            </button>
                            :
                            <button type="button" className="btn btn-outline-secondary" data-testid="Save" onClick={() => handleSaveJob(selectedCardData[0].id)}>
                              <FaSave /> Save
                            </button>
                          :

                          <button type="button" className="btn btn-outline-secondary" data-testid="Save" onClick={() => handleSaveJob(selectedCardData[0].id)}>
                            <FaSave /> Save
                          </button>
                        }
                      </div>


                      <div className="p-2">
                        <button type="button" className="btn btn-outline-secondary" data-testid="Share" data-bs-toggle="modal" data-bs-target="#shareModal">
                          <FaShare /> Share
                        </button>
                      </div>
                    </div>
                  </div>

                  <JobDescription />
                </div>
                :
                null
            }

            {
              selectedCardData.length === 0 && !selectedSkeleton && gettingResponse ?
                <div className="d-flex align-items-center h-100 justify-content-center">
                  <p className="text-center">No data found</p>
                </div>
                :
                null
            }


            {gettingResponse === false || selectedSkeleton ?
              <div className="card-body p-0">
                <div className="col-12 JobDescription-sticky-top-height bg-white rounded-4">
                  <div className="d-flex align-items-center my-2">
                    <div className="flex-shrink-0 ms-2 placeholder rounded-circle pe-none">
                      <img src={Logo} alt="..." width={52} height={52} className='opacity-0' />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <p className="job-posted-on placeholder rounded col-5 py-3"></p>
                      <h3 className="job-heading placeholder rounded col-8"></h3>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="me-auto ms-5 p-2">
                      <button className="btn btn-outline-secondary ms-3 placeholder px-5 pe-none"></button>
                    </div>

                    <div className="p-2">
                      <button className="btn btn-outline-secondary placeholder px-5"></button>
                    </div>


                    <div className="p-2">
                      <button className="btn btn-outline-secondary placeholder px-5"></button>
                    </div>
                  </div>
                </div>

                <JobDescription />
              </div>
              :
              null
            }
          </div>
        </div>
      </div>



      {/* apply job modal box  */}
      <div className="modal fade" id="ApplyJobModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg vh-50">
          <div className="modal-content p-2">
            <form ref={inputFile} onSubmit={handleFormDataApplyJob}>
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Apply for job</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <div className="container pe-0">
                    {selectedCardData.length > 0 && selectedCardData[0] !== undefined ?
                      <>
                        {selectedCardData[0].required_resume !== undefined ?
                          selectedCardData[0].required_resume === "Y" ?
                            <div className="col-12 my-3">
                              <div className="card border-0 h-100">

                                {resumeData.length > 0 ?
                                  <div className="card border-0 h-100 rounded-4">
                                    <div className="card-body border rounded-3 pt-4 ">
                                      <div className="d-flex justify-content-between align-items-center pb-3 " >
                                        <div className="p-1 uploaded-resume-container ">
                                          <div>
                                            <BsFiletypePdf className="pdf-icon me-3" />
                                          </div>
                                          <div>
                                            <p className="resume-name mb-1">{resumeData[0].name !== undefined ? resumeData[0].name : null}</p>
                                            <p className="fileUploadedOnText pb-0 mb-0">File uploaded on : 13/04/2024</p>
                                          </div>
                                        </div>

                                      </div>
                                      <hr />
                                      <div className="px-3 gap-3 mt-2 d-flex float-end align-items-center">
                                        <LuUpload className="upload-icon fs-4 brand-color" title="Upload New Resume" onClick={() => setResumeData([])} />
                                      </div>
                                    </div>
                                    {/* {fileUploadLoading ? (
                                    <div className="progress mx-5 mb-3">
                                      <div
                                        className="progress-bar bg-brand-color progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: `${progressPercentage}%` }}
                                      // style={{ width: '100%' }}
                                      >
                                        Loading {progressPercentage}%
                                      </div>
                                    </div>
                                  ) : null} */}
                                  </div>
                                  :
                                  <div className="card-body d-flex align-items-center justify-content-center p-0">
                                    <div
                                      className="border rounded-4 w-100 py-3"
                                      onClick={() =>
                                        document.getElementById("resume-upload").click()
                                      }
                                    >
                                      <input
                                        type="file"
                                        className="form-control"
                                        id="resume-upload"
                                        hidden
                                        accept=".doc, .docx,.pdf, .txt"
                                        onChange={handleSaveResume}
                                      />
                                      <div className="text-center">
                                        <div className="fs-2">
                                          <LuUpload />
                                        </div>
                                        <p className="px-5 m-0 pt-4">Drag and drop or click here to upload resume</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>

                              {
                                resumeData.length === 0 && modalBoxErr ? <div className="col-12">
                                  <p className="text-danger mt-2">Resume Required</p>
                                </div>
                                  :
                                  null
                              }

                            </div>
                            :
                            null
                          :
                          null
                        }

                        {selectedCardData[0].required_cover_letter !== undefined ?
                          selectedCardData[0].required_cover_letter === "Y" ?
                            <div className="col-12 my-3">
                              <div className="card border-0 h-100">

                                {coverLetterData.length > 0 ?
                                  <div className="card border-0 h-100 rounded-4">
                                    <div className="card-body border rounded-3 pt-4 ">
                                      <div className="d-flex justify-content-between align-items-center pb-3 " >
                                        <div className="p-1 uploaded-resume-container ">
                                          <div>
                                            <BsFiletypePdf className="pdf-icon me-3" />
                                          </div>
                                          <div>
                                            <p className="resume-name mb-1">{coverLetterData[0].name !== undefined ? coverLetterData[0].name : null}</p>
                                            <p className="fileUploadedOnText pb-0 mb-0">File uploaded on : 13/04/2024</p>
                                          </div>
                                        </div>

                                      </div>
                                      <hr />
                                      <div className="px-3 mt-2 d-flex float-end align-items-center">
                                        <LuUpload className="upload-icon fs-4 brand-color" title="Upload New Resume" onClick={() => setCoverLetterData([])} />
                                      </div>
                                    </div>
                                    {/* {fileUploadLoading ? (
                                    <div className="progress mx-5 mb-3">
                                      <div
                                        className="progress-bar bg-brand-color progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: `${progressPercentage}%` }}
                                      // style={{ width: '100%' }}
                                      >
                                        Loading {progressPercentage}%
                                      </div>
                                    </div>
                                  ) : null} */}
                                  </div>
                                  :
                                  <div className="card-body d-flex align-items-center justify-content-center p-0">
                                    <div
                                      className="border rounded-4 w-100 py-3"
                                      onClick={() =>
                                        document.getElementById("coverLetter-upload").click()
                                      }
                                    >
                                      <input
                                        type="file"
                                        className="form-control"
                                        id="coverLetter-upload"
                                        hidden
                                        accept=".doc,.docx,.pdf"
                                        onChange={handleSaveCoverLetter}
                                      />
                                      <div className="text-center">
                                        <div className="fs-2">
                                          <LuUpload />
                                        </div>
                                        <p className="px-5 m-0 pt-4">Drag and drop or click here to upload Cover letter</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>

                              {
                                coverLetterData.length == 0 && modalBoxErr ? <div className="col-12">
                                  <p className="text-danger mt-2">Cover Letter Required</p>
                                </div>
                                  :
                                  null
                              }
                            </div>
                            :
                            null
                          :
                          null
                        }

                        {questionModal && selectedCardData[0].questions.length > 0 && selectedCardData[0].questions[0] !== null ?
                          selectedCardData[0].questions.map((v, i) => {
                            return <div key={i}>
                              <div className="row mb-2 ">
                                <div className="col-lg-12 d-flex justify-content-between">
                                  <h6>{v.custom_pre_screen_ques}</h6>
                                </div>
                              </div>
                              <div className="container">
                                <div className="row">
                                  <textarea className="p-3 rounded-3 mb-3" value={answers[i].answer} onChange={(e) => handleAnswer(e, v.id)} required minLength={25} maxLength={10000} rows={4} placeholder="Enter your text here.." />

                                  {
                                    answers[i].answer === '' && modalBoxErr ? <div className="col-12">
                                      <p className="text-danger">fields are empty</p>
                                    </div>
                                      :
                                      null
                                  }
                                </div>
                              </div>
                            </div>

                          })
                          :
                          null
                        }


                      </>
                      :
                      null
                    }
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top-0" >
                <div className="container">
                  <div className="row float-end">
                    <div className="col-lg-12 ">
                      <button type="submit" className="btn btn-brand-color my-2 px-5" id="applyNowBtn">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* Share Modal */}
      <div className="modal fade" id="shareModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Share</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pb-0">
              <div className="social-media">
                <p className="share-text">Share the link via</p>
                <ul className="row align-items-center justify-content-around w-100 list-unstyled">
                  <li className="col text-center"> <a href="#"><IoLogoWhatsapp className="fs-2 whastapp-color " /></a></li>
                  <li className="col text-center"> <a href="#"><FaFacebook className=" fs-2 facebook-color " /></a></li>
                  <li className="col text-center"><a href="#"><FaLinkedin className=" fs-2 linkedin-color " /></a></li>
                  <li className="col text-center"> <a href="#"><FaTelegram className=" fs-2 telegram-color " /></a></li>
                  <li className="col text-center"> <a href="#"><IoMailOpen className=" fs-2 mail-color " /></a></li>
                </ul>
              </div>
            </div>
            <div className="modal-body pt-0">
              <div className="mb-5">
                <label htmlFor="message-text" className="col-form-label mb-2">or copy link</label>
                <input className="form-control position-relative mx-auto mt-0 linkFieldSize" id="message-text" value={textCopy} onChange={(e) => setTextCopy(e.target.value)} readOnly />
                <button type="button" className="btn btn-brand-color button-position" onClick={handleCopytext}>Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default JobWorkSpace;
