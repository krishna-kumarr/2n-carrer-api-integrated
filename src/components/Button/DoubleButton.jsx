import React from 'react'
import { FaDownload } from "react-icons/fa";
const DoubleButton = ({ firstButtonName, secondButtonName,cardIcon,firstCardColorclassName,secondCardColorclassName }) => {
    return (
        <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-2 mx-1">
            <button className={`btn btn-${firstCardColorclassName} me-md-2 w-100`} type="button">
                {cardIcon}
                {firstButtonName}</button>

            <button className={`btn btn-${secondCardColorclassName} w-100`} type="button">{secondButtonName}</button>
        </div>
    )
}

export default DoubleButton