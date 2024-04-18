import React, { useContext, useEffect, useState } from 'react';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import FilterLabel from '../Label/FilterLabel';
import CommonContext from '../../hooks/CommonContext';

const HomeFilterForm = () => {
    const { FilterArray, gettingResponse } = useContext(CommonContext);
    const [skills, setSkills] = useState("");
    const [sectors, setSectors] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [location, setLocation] = useState("");
    const [workplaceType, setWorkplaceType] = useState([]);
    const [jobTypee, setJobTypee] = useState([]);
    const [schedule, setSchedule] = useState([])
    const filterHeadings = ["dummy", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy"]

    const object = {
        skill: skills,
        sector: sectors,
        specialisation: specialization,
        workplace_type: workplaceType,
        city: location,
        job_type: jobTypee,
        schedule: schedule
    }

    const handleWorkplaceType = (e) => {
        if (e.target.checked) {
            setWorkplaceType(prevState => [...prevState, e.target.name])
        }
        else {
            if (!e.target.checked) {
                const removeUnwantedWorkplace = workplaceType.filter((v) => {
                    return v !== e.target.name
                })
                setWorkplaceType(removeUnwantedWorkplace)
            }
        }
    }

    const handleJobType = (e) => {
        if (e.target.checked) {
            setJobTypee(prevState => [...prevState, e.target.name])
        }
        else {
            if (!e.target.checked) {
                const removeUnwantedJobType = jobTypee.filter((v) => {
                    return v !== e.target.name
                })
                setJobTypee(removeUnwantedJobType)
            }
        }
    }

    const handleSchedule = (e) => {
        if (e.target.checked) {
            setSchedule(prevState => [...prevState, e.target.name])
        }
        else {
            if (!e.target.checked) {
                const removeUnwantedSchedule = schedule.filter((v) => {
                    return v !== e.target.name
                })
                setSchedule(removeUnwantedSchedule)
            }
        }
    }

    const handleApplyFilter = () => {
        console.log(object)
    }

    return (
        <form>

            {
                gettingResponse === false ?
                    filterHeadings.map((value, index) => {
                        return <div className="mb-5 placeholder-glow" key={index}>
                            <p className="card-title placeholder col-6 rounded py-3"></p>
                            <h6 className="card-text placeholder col-12 rounded py-2 pt-3"></h6>
                        </div>
                    })
                    :
                    null
            }

            {
                FilterArray.skill !== undefined ?
                    <div className="mb-3 dropdown custom-dropdown dropdownWordSize">
                        <FilterLabel spanContent={"Skills"} spanClassName={"job-filter-sub-headings"} labelHtmlFor={"skills"} lableClassName={"form-label fs-4 mb-2"} />
                        <button className="btn btn-secondary dropdown-toggle w-100" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {skills === "" ? "Select skill" : skills}
                        </button>
                        <ul className="dropdown-menu overflow-scroll" >
                            {
                                FilterArray.skill.length !== 0 ? <>
                                    {FilterArray.skill.map((value, index) => {
                                        return <li onClick={() => setSkills(value)} key={index}><a className="dropdown-item" >{value}</a></li>
                                    })}
                                </>
                                    :
                                    <li><a className="dropdown-item disabled">No Datas Found</a></li>
                            }
                        </ul>
                    </div>
                    :
                    null
            }

            {
                FilterArray.sector !== undefined ?
                    <div className="mb-3 dropdown custom-dropdown dropdownWordSize">
                        <FilterLabel spanContent={"Sectors"} spanClassName={"job-filter-sub-headings"} labelHtmlFor={"selectors"} lableClassName={"form-label fs-4 mb-2"} />
                        <button className="btn btn-secondary dropdown-toggle w-100 pe-5" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {sectors === "" ? "Select Sector" : sectors}
                        </button>
                        <ul className="dropdown-menu overflow-scroll" >
                            {
                                FilterArray.sector.length !== 0 ? <>
                                    {FilterArray.sector.map((value, index) => {
                                        return <li onClick={() => setSectors(value)} key={index}><a className="dropdown-item" >{value}</a></li>
                                    })}
                                </>
                                    :
                                    <li><a className="dropdown-item disabled">No Datas Found</a></li>
                            }
                        </ul>
                    </div>
                    :
                    null
            }

            {
                FilterArray.specialisation !== undefined ?
                    <div className="mb-3 dropdown custom-dropdown dropdownWordSize">
                        <FilterLabel spanContent={"Specialization"} spanClassName={"job-filter-sub-headings"} labelHtmlFor={"Specialization"} lableClassName={"form-label fs-4 mb-2"} />
                        <button className="btn btn-secondary dropdown-toggle w-100 pe-5" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {specialization === "" ? "Select specialization" : specialization}
                        </button>
                        <ul className="dropdown-menu overflow-scroll" >
                            {
                                FilterArray.specialisation.length !== 0 ? <>
                                    {FilterArray.specialisation.map((value, index) => {
                                        return <li onClick={() => setSpecialization(value)} key={index}><a className="dropdown-item" >{value}</a></li>
                                    })}
                                </>
                                    :
                                    <li><a className="dropdown-item disabled">No Datas Found</a></li>
                            }
                        </ul>
                    </div>
                    :
                    null
            }

            {
                FilterArray.workplace_type !== undefined ?
                    <div className="mb-3">
                        <h5 className="job-filter-sub-headings">Workplace Type</h5>
                        {
                            FilterArray.workplace_type.length !== 0 ? <>
                                {FilterArray.workplace_type.map((value, index) => {
                                    return <div className="form-check ms-3" key={index}>
                                        <Input name={value} functionOnchange={handleWorkplaceType} className="form-check-input" type="checkbox" testId={value} id={`workplace_${value}`} formFieldName={value} formLableFor={`workplace_${value}`} formLableClass={"form-check-label"} />
                                    </div>
                                })}
                            </>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }

            {
                FilterArray.location !== undefined ?
                    <div className="mb-3 dropdown custom-dropdown dropdownWordSize">
                        <FilterLabel spanContent={"Location"} spanClassName={"job-filter-sub-headings"} labelHtmlFor={"location"} lableClassName={"form-label fs-4 mb-2"} />
                        <button className="btn btn-secondary dropdown-toggle w-100" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {location === "" ? "Select Location" : location}
                        </button>
                        <ul className="dropdown-menu overflow-scroll" >
                            {
                                FilterArray.location.length !== 0 ? <>
                                    {FilterArray.location.map((value, index) => {
                                        return <li onClick={() => setLocation(value)} key={index}><a className="dropdown-item" >{value}</a></li>
                                    })}
                                </>
                                    :
                                    <li><a className="dropdown-item disabled">No Datas Found</a></li>
                            }
                        </ul>
                    </div>
                    :
                    null
            }

            {
                FilterArray.job_type !== undefined ?
                    <div className="mb-3">
                        <h5 className="job-filter-sub-headings">Job Type</h5>
                        {
                            FilterArray.job_type.length !== 0 ? <>
                                {FilterArray.job_type.map((value, index) => {
                                    return <div className="form-check ms-3" key={index}>
                                        <Input name={value} functionOnchange={handleJobType} className={"form-check-input"} type={"checkbox"} testId={value} id={`workplace_${value}`} formFieldName={value} formLableFor={`workplace_${value}`} formLableClass={"form-check-label"} />
                                    </div>
                                })}
                            </>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }

            {
                FilterArray.schedule !== undefined ?
                    <div className="mb-3">
                        <h5 className="job-filter-sub-headings">Schedule</h5>
                        {
                            FilterArray.schedule.length !== 0 ? <>
                                {FilterArray.schedule.map((value, index) => {
                                    return <div className="form-check ms-3" key={index}>
                                        <Input name={value} functionOnchange={handleSchedule} className={"form-check-input"} type={"checkbox"} testId={value} id={`workplace_${value}`} formFieldName={value} formLableFor={`workplace_${value}`} formLableClass={"form-check-label"} />
                                    </div>
                                })}
                            </>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }

            <div >
                {
                    gettingResponse === false ?
                        <Button buttonType={"button"} className={"btn btn-brand-color w-100 placeholder pointer"} />
                        :
                        <Button buttonType={"button"} className={"btn btn-brand-color w-100"} title={"Apply Filter"} functionOnchange={handleApplyFilter} />

                }
            </div>
        </form>
    )
}

export default HomeFilterForm