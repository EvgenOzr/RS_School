import React, {useState, useEffect, ReactElement, useContext}from "react";
import SwapiService from "../Services/swapi-service";
import Spinner from '../Spinner/Spinner';
import ErrorIndicator from '../Error-indicator/Error-indicator';
import './Card-list-details.css'
import { ThemeContext } from "../Context/Context";

interface CardLisDetailsProps {
    search: string,
    id: string
}

interface CardDetailsType {
    cardDetailsView: {[key: string]: string},
    loading: boolean,
    error: boolean
}

// type cardDetailsViewType = keyof typeof CardDetailsType

const CardListDetails = ({search, id}: CardLisDetailsProps) => {
    // console.log(search, id);
    const [cardDetails, setCardDetails] = useState<CardDetailsType>({
        cardDetailsView: {},
        loading: false,
        error: false
    })
    const [show, setShow] = useState(true);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        if(id !== ''){
            setCardDetails({
                ...cardDetails,
                loading: true
            })

            getSearchResults(`${search}/${id}`)
                .then(onSearchLoaded)
                .catch(() => setCardDetails({
                    ...cardDetails,
                    error: true
                }))
        }
    }, [id])

    const getSearchResults = async (item: string) => {
        const res = await SwapiService(item)
        return res;
    }

    const onSearchLoaded = (answer: {}) => {
        // setStatrView(false)
        // console.log(answer);
        if(show === false) changeShow();
        setCardDetails({
            cardDetailsView: answer,
            loading: false,
            error: false
        })
    }
    
    const changeShow = () => {
        setShow(!show)
    } 

    if(id === '') return null;
    if(cardDetails.error) return <ErrorIndicator/>
    if(cardDetails.loading) return <Spinner/>


    if (cardDetails && show) {
        // console.log(cardDetails.cardDetailsView);
        const {cardDetailsView} = cardDetails;
        const cardDetailsData: ReactElement[] = [];
        for (const key in cardDetailsView) {
            if(typeof cardDetailsView[key] === 'string'){
                cardDetailsData.push(
                    <li className={`list-group-item view-item ${theme}`} key={key}>
                        <span>{key}: </span>
                        <span>{cardDetailsView[key]}</span>
                    </li>
                )
            }
        }
        
        return (
            <div className="view-details">
                {/* <ul className="list-group list-group-flush"> */}
                <ul className="list-group list-group-flush ">
                    {cardDetailsData}
                </ul>
                <button type="button" className="btn-close" aria-label="Close" onClick={changeShow}></button>
            </div>
            
        )
    }
}

export default CardListDetails;