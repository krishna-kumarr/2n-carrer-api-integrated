import React from "react";
import { IoCalendarOutline, IoAdd } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { PiBagFill } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";

const ProfileInfoAddCard = ({ cardHeadingIcon, cardHeading, data, handleEditExperience, handleEditEducation, profilePageAllContent }) => {

    if (data === undefined) return


    console.log(data)
    return (
        <>
            <div className="card mt-3 border-0 shadow-sm rounded-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between ms-1">
                        <label className="profile-side-headers d-flex align-items-center">
                            {cardHeadingIcon}
                            <span>{cardHeading}</span>
                        </label>
                        {cardHeading === "Experience" ?
                            <button type="button" title="Add Experience" className="btn btn-brand-color px-3 me-2" data-bs-toggle="modal" data-bs-target="#addExperienceModal">
                                <MdAddBox /> Add Experience
                            </button> : null
                        }
                        {cardHeading === "Education" ?
                            <button type="button" title="Add Education" className="btn btn-brand-color px-3 me-2" data-bs-toggle="modal" data-bs-target="#addEducationModal">
                                <MdAddBox /> Add Education
                            </button> : null
                        }
                    </div>


                    {/* <React.Fragment >
                                    <div className="ms-5">
                                        <div className="d-flex justify-content-between  mt-3">
                                            <label className="profile-inner-headers">
                                                
                                            </label>
                                          

                                        </div>

                                        {cardHeading === "Experience" ? 
                                         <p className="mt-1 profile-descriptions">
                                         Your Experience details will be displayed here..
                                     </p> :  <p className="mt-1 profile-descriptions">
                                            Your Education details will be displayed here..
                                        </p> }


                                        <hr className="" />
                                    </div>
                                </React.Fragment> */}



                    {
                        data.map((val) => {
                            return (
                                <React.Fragment key={val.id}>


                                    {
                                        data.length === 0 ? 
                                            <>
                                                {cardHeading === "Education" ? <p>Your education details will be displayed here</p> : ""}
                                                {cardHeading === "Experience" ? <p>Your experience details will be displayed here</p> : ""}
                                            </>
                                          
                                          :
                                          <div className="ms-5">
                                          <div className="d-flex justify-content-between mt-3 ">
                                              <label className="profile-inner-headers placeholder-glow">
                                                  {cardHeading === "Experience" ? <span >{val.job_title} | {val.company_name}</span> : null}
                                                  {cardHeading === "Education" ? <span>{val.degree_level} | {val.institute_name}</span> : null}
                                              </label>
                                              {cardHeading === "Experience" ? <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Experience" onClick={(e) => handleEditExperience(e, val.id)} data-bs-toggle="modal" data-bs-target="#editExperienceModal" /> : null}
                                              {cardHeading === "Education" ? <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit Education" onClick={(e) => handleEditEducation(e, val.id)} data-bs-toggle="modal" data-bs-target="#editEducationModal" /> : null}
  
                                          </div>
  
  
                                          <label className="profile-descriptions">
                                              <IoCalendarOutline /> <span>{val.start_month} {val.start_year}</span> - <span>{val.end_month} {val.end_year}</span>
                                              {cardHeading === "Experience" ? <span>
                                                  <IoLocationOutline /> {val.job_location}
                                              </span> : null}
                                              {cardHeading === "Education" ? <span>
                                                  <IoLocationOutline /> {val.institute_location}
                                              </span> : null}
                                          </label>
  
                                          {cardHeading === "Experience" ? <p className="mt-1 profile-descriptions">
                                              {val.job_description}
                                          </p> : null}
                                          {cardHeading === "Education" ? <p className="mt-1 profile-descriptions">
                                              {val.specialisation}
                                          </p> : null}
                                          <hr className="" />
                                      </div>
                                    }


                                </React.Fragment>
                            )
                        })
                    }


                </div>
            </div>
        </>
    )
}

export default ProfileInfoAddCard
