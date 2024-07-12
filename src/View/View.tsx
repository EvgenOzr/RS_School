import React, {useState, useEffect, useRef} from "react";
import SwapiService from "../Services/swapi-service";
import './View.css';
import Row from "../Row/Row";
import CardList from "../Card-list/Card-list";
import CardListDetails from "../Card-list-details/Card-list-details";
import Spinner from "../Spinner/Spinner";
import { useNavigate} from "react-router-dom";

interface IProps {
    search: string,
}

interface View {
    searchView: [],
    loading: boolean,
    error: boolean
}

const View = ({search}: IProps) =>  {

    let navigate = useNavigate();
    const [view, setView] = useState<View>(
        {
            searchView: [],
            loading: false,
            error: false
        }
    );
    const [id, setId] = useState('')
    const page = useRef(1)

    useEffect(() =>{
        if (search !== ''){
            setView({
                ...view,
                loading: true
            })
            getSearchResults(search)
                .then(onSearchLoaded)
                .catch(onError)
        }
    }, [search])

    const onSearchLoaded = (answer: []) => {
        navigate(`/view/${page.current}`)
        setView({
            searchView: answer,
            loading: false,
            error: false
        })
        setId('')
    }

    const onError = () => {
        setView({
            ...view,
            loading: false,
            error: true
        })
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
            setView({
                ...view,
                loading: true
            })
            page.current += 1;
            navigate(`/view/${page.current}`)
            getSearchResults(`${search}/?page=${page.current}`)
                .then(onSearchLoaded)
                .catch(onError);

        }
    }

    if(view.loading) return <Spinner/>
    if(view.error) return <div>Nothing found</div>
    if(search === '') return null;

    return(
        <div className="view">
            <h2>Results</h2>
            <button onClick = {onClickNextPage}>Next Page</button>
            <Row left={<CardList data={view.searchView} onItemSelected={onItemSelected}/>} right={<CardListDetails search={search} id={id}/>}></Row>
        </div>
    )

}

export default View;