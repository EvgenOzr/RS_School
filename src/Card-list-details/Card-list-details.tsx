import React, {useState, useEffect, ReactElement}from "react";
import SwapiService from "../Services/swapi-service";
import Spinner from '../Spinner/Spinner';
import ErrorIndicator from '../Error-indicator/Error-indicator';
import './Card-list-details.css'

interface CardLisDetailsProps {
    search: string,
    id: string
}

const CardListDetails = ({search, id}: CardLisDetailsProps) => {
    // console.log(search, id);
    const [cardDetails, setCardDetails] = useState({
        cardDetailsView: {},
        loading: false,
        error: false
    })
    const [show, setShow] = useState(true)

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
        let cardDetailsData: ReactElement[] = [];
        for (let key in cardDetailsView) {
            if(typeof cardDetailsView[key] === 'string'){
                cardDetailsData.push(
                    <li className='list-group-item view-item' key={key}>
                        <span>{key}: </span>
                        <span>{cardDetailsView[key]}</span>
                    </li>
                )
            }
        }
        
        return (
            <div className="view-details card">
                <ul className="list-group list-group-flush">
                    {cardDetailsData}
                </ul>
                <button type="button" className="btn-close" aria-label="Close" onClick={changeShow}></button>
            </div>
            
        )
    }
}

export default CardListDetails;