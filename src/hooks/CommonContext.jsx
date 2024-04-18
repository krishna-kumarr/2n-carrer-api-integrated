import { createContext, useEffect, useState } from "react";
import axios from "axios";


const CommonContext = createContext();

export const DataProvider = ({ children }) => {
    // home page states 
    const [gettingResponse, setGettingResponse] = useState(false)
    const [FilterArray, setFilterArray] = useState({});
    const [cardArray, setCardArray] = useState([]);
    const [userNavbarinfo, setUserNavinfo] = useState([]);
    const [cardArrayDuplicate, setCardArrayDuplicate] = useState([]);
    const [selectedCardData, setSelectedCardData] = useState([]);
    const [answers, setAnswer] = useState([])
    const [selectedSkeleton, setSelectedSkeleton] = useState(false);
    const [refreshId,setRefreshId]= useState(0)
    const [refreshAction,setRefreshAction]= useState(false)


    useEffect(() => {
        if (userNavbarinfo.length === 0) {
            const getUserDetails = async () => {
                const token = localStorage.getItem("Token")
                try {
                    await axios.get("https://api.2ndcareers.com/user_dashboard_details", {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            console.log(res.data)
                            if (res.data.error_code === 0) {
                                setUserNavinfo(res.data.data.user_details)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                catch (err) {
                    console.log(err)
                }
            }
            (async () => getUserDetails())();
        }
    }, [])


    return (
        <CommonContext.Provider value={{
            cardArray,
            setCardArray,
            FilterArray,
            setFilterArray,
            selectedCardData,
            setSelectedCardData,
            gettingResponse,
            setGettingResponse,
            cardArrayDuplicate,
            setCardArrayDuplicate,
            selectedSkeleton,
            setSelectedSkeleton,
            userNavbarinfo,
            setUserNavinfo,
            answers,
            setAnswer,
            refreshId,
            setRefreshId,
            refreshAction,
            setRefreshAction
        }}
        >


            {children}
        </CommonContext.Provider>
    )
}


export default CommonContext;