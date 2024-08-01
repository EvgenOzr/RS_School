import React, {useState, useEffect, ReactElement, useContext}from "react";
import Spinner from '../Spinner/Spinner';
import ErrorIndicator from '../Error-indicator/Error-indicator';
import './Card-list-details.css'
import { ThemeContext } from "../Context/Context";
import { useGetSearchQuery } from "../Services/swapi-service";

interface CardLisDetailsProps {
    search: string,
    id: string
}

const CardListDetails = ({search, id}: CardLisDetailsProps) => {

    const {data, isFetching, isError} = useGetSearchQuery(`${search}/${id}`)
    const [show, setShow] = useState(true);
    const theme = useContext(ThemeContext);

    useEffect(() => setShow(true), [id])

    const changeShow = () => {
        setShow(!show)
    } 

    if(id === '') return null;
    if(isError) return <ErrorIndicator/>
    if(isFetching) return <Spinner/>


    if (data && show) {
        const cardDetailsData: ReactElement[] = [];
        for (const key in data) {
            if(typeof data[key] === 'string'){
                cardDetailsData.push(
                    <li className={`list-group-item view-item ${theme}`} key={key}>
                        <span>{key}: </span>
                        <span>{data[key]}</span>
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