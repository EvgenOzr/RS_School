import React, {useState, useEffect, useRef, useContext} from "react";
import SwapiService from "../Services/swapi-service";
import './View.css';
import Row from "../Row/Row";
import CardList from "../Card-list/Card-list";
import CardListDetails from "../Card-list-details/Card-list-details";
import Spinner from "../Spinner/Spinner";
import { useNavigate} from "react-router-dom";
import { ThemeContext } from "../Context/Context";
import { useAppSelector, useAppDispatch} from '../Hooks/hooks'
import {searchSuccess, searchRequest, searchFailure} from '../store/searchSlice';

interface IProps {
    search: string,
}

// interface View {
//     searchView: [],
//     loading: boolean,
//     error: boolean
// }

const View = ({search}: IProps) =>  {
    const searchView = useAppSelector(state => state.search.results);
    const {loading, error} = useAppSelector(state => state.search)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [id, setId] = useState('')
    const page = useRef(1);
    const theme = useContext(ThemeContext);

    useEffect(() =>{
        if (search !== ''){
            dispatch(searchRequest(true))
            getSearchResults(search)
                .then(onSearchLoaded)
                .catch(onError)
        }
    }, [search])

    const onSearchLoaded = (answer: []) => {

        navigate(`/view/${page.current}`)
        dispatch(searchSuccess(answer))
        setId('')
    }

    const onError = (e: Error) => {
        dispatch(searchFailure(e))
    }

    const getSearchResults = async (item: string) => {
        const res = await SwapiService(item)
        return res.results;
    }

    const onItemSelected = (id: string) => {
        setId(id)
    }

    const onClickNextPage = () => {
        if (search !== ''){
            dispatch(searchRequest(true))
            page.current += 1;
            navigate(`/view/${page.current}`)
            getSearchResults(`${search}/?page=${page.current}`)
                .then(onSearchLoaded)
                .catch(onError);

        }
    }

    if(search === '') return null;
    if(loading) return <Spinner/>
    if(error) return <div>Nothing found</div>

    return(
        <div className="view">
            <h2 className="header">Results</h2>
            <button className={theme} onClick = {onClickNextPage}>Next Page</button>
            <Row left={<CardList data={searchView} onItemSelected={onItemSelected}/>} right={<CardListDetails search={search} id={id}/>}></Row>
        </div>
    )
}

export default View;