import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import DoubleButton from "../Button/DoubleButton";
import { FaLinkedin, FaTelegram, FaFacebook } from "react-icons/fa6";
import { IoMailOpen, IoLogoWhatsapp } from "react-icons/io5";

const CardWithImage = ({
  cardImage,
  cardTitle,
  cardText,
  cardTextClassName,
  cardParaTestId,
  cardButtonTestId,
  buttonName,
  role,
  firstButton_Name,
  secondButton_Name,
  icon,
  firstCardColor,
  secondCardColor,
  pageRenderPath,
  width,
  height,
  imageClassName,
  cardTitleStyle,
  modalContent,
  leftLearnButtonClick,
  leftCommButtonClick,
  rightLearnButtonClick,
  rightCommButtonClick,
  cardKey,
  apiloading,
  leftLearnUrl,
  leftCommUrl,
  rightLearnUrl,
  rightCommUrl
}) => {



  const [modelBoxContent,setModelBoxContent]=useState('')

  const [buttonText, setButtonText] = useState('Copy')

  const handleLeftLearnButtonClick = () => {

    const link = leftLearnUrl.replace(/b'/g, '')
    console.log(link)
    const pdfBlob = new Blob([link], { type: "application/pdf" });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(pdfBlob);

    // Create a temporary <a> element to trigger the download
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.target = '_blank'
    tempLink.setAttribute(
      "download",
      `bill_${'User_Id'}_${'date'}.pdf`
    ); // Set the desired filename for the downloaded file

    // Append the <a> element to the body and click it to trigger the download
    document.body.appendChild(tempLink);
    tempLink.click();

    // Clean up the temporary elements and URL
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);
  }

  const handleRightLearnButtonClick = () => {

    const url = rightLearnUrl
    console.log(url)
    const tempLink = document.createElement("a");
    tempLink.href = url;

    document.body.appendChild(tempLink);
    tempLink.click();

    document.body.removeChild(tempLink);
  }

  const handleLeftCommButtonClick = () => {

    const url = leftCommUrl
    console.log(url)
    const tempLink = document.createElement("a");
    tempLink.href = url;

    document.body.appendChild(tempLink);
    tempLink.click();

    document.body.removeChild(tempLink);
  }
  
  return (

    <div className="card h-100 shadow mb-5 bg-body rounded-4 border-0 overflow-hidden" key={cardKey}>

      <img src={cardImage} className={imageClassName} alt="Card Image" data-testid='imgTesting' width={width} height={height} />
      <div className="card-body" >
        <h5 className={`card-title ${cardTitleStyle}`} data-testid='cardHeadingTestId'>{cardTitle}</h5>
        <span className={`card-text ${cardTextClassName}`} data-testid={cardParaTestId}>{cardText.slice(0, 150)}{cardTitleStyle === 'learningTitle' || cardTitleStyle === 'communityTitle' ? <span className="btn btn-link p-0"

          leftlearnUrl leftCommUrl rightleaernUrl rightCommUrl

          data-bs-toggle="modal" data-bs-target="#learnMore"> Read More </span> : null}</span>
      </div>


      <div className="modal fade col-md-4" id="learnMore" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{cardTitle}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body h-100 mb-4 mx-2">
              {modalContent}
            </div>

          </div>
        </div>
      </div>


      <div className="card-footer bg-transparent border-0">
        {role === 'learningAndCommunity' ?
          <DoubleButton firstButtonName={firstButton_Name} secondButtonName={secondButton_Name} cardIcon={icon} firstCardColorclassName={firstCardColor} secondCardColorclassName={secondCardColor}
            leftlearnButtonClick={handleLeftLearnButtonClick} leftCommButtonClick={handleLeftCommButtonClick} rightLearnButtonClick={handleRightLearnButtonClick} rightCommButtonClick

          />
          : <Button
            className="rounded w-100 mb-2 sign-up-buttons"
            title={buttonName}
            buttonType="button"
            functionOnchange={pageRenderPath}
            testId={cardButtonTestId}
          />}
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
              <form>
                <div className="">
                  <label htmlFor="message-text" className="col-form-label">Share the link via</label>
                  <p className="fs-2 row">
                    <div className="circle whastapp-color mx-3 fs-3 position-relative"><a href=""><IoLogoWhatsapp className="whastapp-color icon-position" /></a></div>
                    <div className="circle text-info me-3 fs-3 position-relative"><a href=""><FaFacebook className="facebook-color icon-position" /></a></div>
                    <div className="circle text-info me-3 fs-3 position-relative"><a href=""><FaLinkedin className="linkedin-color icon-position" /></a></div>
                    <div className="circle text-info me-3 fs-3 position-relative"><a href=""><FaTelegram className="telegram-color icon-position" /></a></div>
                    <div className="circle text-danger me-3 fs-3 position-relative"><a href=""><IoMailOpen className="mail-color icon-position" /></a></div>
                  </p>
                  <label htmlFor="message-text" className="col-form-label">or copy link</label>
                </div>
              </form>
            </div>
            <div className="modal-body pt-0">
              <div className="mb-5">
                <input className="form-control position-relative mx-auto mt-0 linkFieldSize" id="message-text" value={rightCommUrl} />
                <button type="button" className="btn btn-brand-color button-position" onClick={() => { setButtonText('Copied') }}>{buttonText}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithImage;