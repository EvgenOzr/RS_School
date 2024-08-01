import React, {useState, useEffect, useContext} from "react";
import './Search-panel.css';
import { ThemeContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";


type MyProps = {
    onUpdateSearch: (arg0: string) => void
}

const Search = ({onUpdateSearch} : MyProps)  => {

    const [search, setSearch] = useState('')
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()

    useEffect(() => {
        const searchLocal  = localStorage.getItem('search');
        if(typeof searchLocal === 'string'){
            setSearch(searchLocal);
        }
    }, [])

    const onChangeSearch = (e: {target: HTMLInputElement}) => {
        const searchRes: string = e.target.value;
        search.trim()
        setSearch(searchRes)
    }

    const onClickSearch = () => {
        onUpdateSearch(search);
        localStorage.setItem('search', search)
        navigate(`/view/1`)
    }

    return(
        <div className="search">
            <input className={`search-input ${theme}`} onChange = {onChangeSearch} value={search}></input>
            <button className={`search-btn ${theme}`} onClick = {onClickSearch}>Search</button>
        </div>
    )
}

export default Search;