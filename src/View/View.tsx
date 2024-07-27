import React, {useState, useEffect, useContext} from "react";
import { useGetSearchQuery } from "../Services/swapi-service";
import './View.css';
import Row from "../Row/Row";
import CardList from "../Card-list/Card-list";
import CardListDetails from "../Card-list-details/Card-list-details";
import Spinner from "../Spinner/Spinner";
import { useNavigate , useParams} from "react-router-dom";
import { ThemeContext } from "../Context/Context";

interface IProps {
    search: string,
}

const View = ({search}: IProps) =>  {
    
    const [view, setView] = useState('')
    const [id, setId] = useState('')
    const {data, isFetching, isError} = useGetSearchQuery(view)
    const navigate = useNavigate();
    const {page} = useParams();
    const theme = useContext(ThemeContext);

    useEffect(() => {
        console.log('use effect', page, search);
        if(view.replace(/\D/gi, '') !== page){
            navigate(`/view/${page}`)
            setView(`${search}/?page=${page}`)
        }
    }, [page])

    useEffect(() => {
        setView(search)
    }, [search])

    const onItemSelected = (id: string) => {
        setId(id)
    }

    const onClickNextPage = (next: number) => {
        if (page) {
            if((next === -1) && (+page === 1)) return;
            let nextPage = +page;
            nextPage += next;
            navigate(`/view/${nextPage}`)
            setView(`${search}/?page=${nextPage}`)
        }
    }

    if(isError) return <div>Nothing found</div>
    if(isFetching) return <Spinner/>
    if(search === '' || !data.results) return <div>Please enter search request</div>

    return(
        <div className="view">
            <h2 className="header">Results</h2>
            <button className={`pags ${theme}`} onClick = {() => onClickNextPage(-1)}>Previous Page</button>
            <button className={`pags ${theme}`} onClick = {() => onClickNextPage(1)}>Next Page</button>
            <Row left={<CardList search={search} data={data.results} onItemSelected={onItemSelected}/>} right={<CardListDetails search={search} id={id}/>}></Row>
        </div>
    )
}

export default View;