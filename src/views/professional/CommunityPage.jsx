import React, { useContext, useEffect, useState } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import CardWithImage from "../../components/Cards/CardWithImage";
import Image from '../../utils/images.js'
import axios from 'axios';
import CommonContext from "../../hooks/CommonContext.jsx";


const CommunityPage = () => {
    const professionalPageDashboardMenu = ['Home', 'Learning', 'Community']
    const communityCards = ["dummy"];

    const [communityData, setCommunityData] = useState([])
    const [communityLoading, setCommunityLoading] = useState(false);

    const [modalApiContent, setModalApiContent] = useState([])

    const token = localStorage.getItem("Token")


    useEffect(() => {
        setCommunityLoading(false);
        const getcommunityDatas = async () => {
            try {
                await axios({
                    method: "post",
                    url: "http://secondcareers.adraproductstudio.com:5000/professional_community",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                    .then((response) => {
                        console.log(response.data.data)

                        getModalData()

                        if (response.data.error_code === 0) {
                            setCommunityData(response.data.data)
                        }
                    })
                    .catch((err) => console.log(err))
            }
            catch (err) {
                console.log(err)
            }
        }
        (async () => getcommunityDatas())();


    }, [])


    const getModalData = async () => {

        try {
            await axios.post("http://secondcareers.adraproductstudio.com:5000/get_detailed_description_learning", { id: 2 },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            ).then((response) => {
                setCommunityLoading(true);
                console.log(response.data)
                console.log(response.data.data[0])
                setModalApiContent(response.data.data[0].detailed_description)
            })
        } catch (err) {
            console.log(err)
        }

    }



    return (
        <>
            <DashboardNavbar profileImage="https://github.com/mdo.png" profileName="George Martin" dashboadMenus={professionalPageDashboardMenu} />

            <div className="community-page-height community-page-bg overflow-scroll">
                <div className="container pt-5">
                    {communityLoading ?
                        <div className="row row-cols-1 row-cols-md-3 g-4 mt-0 mb-4">
                            {communityData.map((value, index) => {
                                return (
                                    <div className="col">
                                        <CardWithImage cardImage={"https://coworkingers.com/wp-content/uploads/2020/06/awfis-1.jpg"}
                                            cardTitle={value.title}
                                            cardTitleStyle="communityTitle"
                                            imageClassName="rounded-top community-img-height"
                                            cardText={value.short_description}
                                            cardKey={index}
                                            carTextClassName="role-selection-description"
                                            cardParaTestId="professionalTestId"
                                            cardButtonTestId="cardButton"
                                            role="learningAndCommunity"
                                            firstButton_Name="Join Community"
                                            secondButton_Name="Share"
                                            firstCardColor="brand-color"
                                            secondCardColor="outline-secondary"
                                            leftCommUrl={value.join_url}
                                            rightCommUrl={value.share_url}
                                        />
                                        {/* { modalApiContent.map((val,ind)=>{
                                        <CardWithImage key={ind} modalContent={val}/>
                                    })} */}
                                    </div>
                                )
                            })}

                        </div>
                        :
                        communityCards.map((v, i) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div
                                        className="card border-0 p-0 rounded-3 overflow-hidden placeholder-glow"
                                        aria-hidden="true"
                                        key={i}
                                    >
                                        <div className="col-12">
                                            <span className="placeholder col-12 py-4 rounded-top"></span>
                                            <span className="placeholder col-12 py-4"></span>
                                            <span className="placeholder col-12 py-4"></span>
                                            <span className="placeholder col-12 py-4 rounded-bottom"></span>
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="p-3 py-5">
                                                <h5 className="card-title ">
                                                    <span className="placeholder col-6 py-3 rounded-3"></span>
                                                </h5>
                                                <p className="card-text">
                                                    <span className="placeholder col-12 py-2 rounded "></span>
                                                    <span className="placeholder col-12 py-2 rounded"></span>
                                                    <span className="placeholder col-12 py-2 rounded"></span>
                                                    <span className="placeholder col-8 py-2 rounded"></span>
                                                </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <button className="btn btn-outline-secondary placeholder col-5"></button>
                                                <button className="btn btn-outline-secondary placeholder col-5"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                
                </div>
            </div>
        </>
    )
}

export default CommunityPage