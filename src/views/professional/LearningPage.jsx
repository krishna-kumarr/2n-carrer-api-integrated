import React, { useContext, useEffect, useState } from "react";
import CardWithImage from "../../components/Cards/CardWithImage";
import { FaDownload } from "react-icons/fa";

import Image from "../../utils/images.js";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar.jsx";
import axios from "axios";
import CommonContext from "../../hooks/CommonContext.jsx";

const LearningPage = () => {
  const professionalPageDashboardMenu = ["Home", "Learning", "Community"];
  const learningCards = ["dummy", "dummy"];

  const [learningData, setLearningData] = useState([]);
  const [learningLoading, setlearningLoading] = useState(false);
  const [modalApiContent, setModalApiContent] = useState([]);


  const token = localStorage.getItem("Token")


  useEffect(() => {
    setModalApiContent([])
    setlearningLoading(false);

    const getlearningDatas = async () => {
      try {

        await axios({
          method: "post",
          url: "https://api.2ndcareers.com/professional_learning",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            getModalData();
            console.log(response.data.data)
            if (response.data.error_code === 0) {
              setLearningData(response.data.data);
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    (async () => getlearningDatas())();
  }, []);


  const getModalData = async () => {
    try {
      await axios
        .post(
          "https://api.2ndcareers.com/get_detailed_description_learning",
          { id: 1 },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data)
          setlearningLoading(true);
          setModalApiContent(response.data.data[0].detailed_description);
        });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <DashboardNavbar
        profileImage="https://github.com/mdo.png"
        profileName="George Martin"
        dashboadMenus={professionalPageDashboardMenu}
      />

      {learningLoading ? (
        <div className="learning-page-height learning-page-bg overflow-scroll">
          <div className="container pt-5">
            <div className="row row-cols-1 row-cols-md-3 mt-0 mb-4">
              {learningData.map((value, index) => {
                return (
                      <div className="col">
                        <CardWithImage
                          cardImage={Image.learningImage}
                          cardTitle={value.title}
                          cardTitleStyle="learningTitle"
                          imageClassName="rounded-4 img-fluid learning-img-height"
                          cardText={value.short_description}
                          cardKey={index}
                          cardParaTestId="professionalTestId"
                          cardButtonTestId="cardButton"
                          role="learningAndCommunity"
                          firstButton_Name="Download"
                          secondButton_Name="Learn"
                          icon={<FaDownload className="me-2" />}
                          firstCardColor="outline-secondary"
                          secondCardColor="brand-color"
                          modalContent={modalApiContent}
                          leftLearnUrl={value.image}
                          rightLearnUrl={value.url}
                        />
                      </div>
                    )
                  }
                )              
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="learning-page-bg py-5 learning-page-height overflow-scroll">
          <div className="container">
            <div className="row col-12 g-3">
              {learningCards.map((v, i) => {
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
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LearningPage;
