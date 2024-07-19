import React, {useState, useEffect, useContext} from "react";
import './Search-panel.css';
import { ThemeContext } from "../Context/Context";

type MyProps = {
    onUpdateSearch: (arg0: string) => void
}

const Search = ({onUpdateSearch} : MyProps)  => {

    const [search, setSearch] = useState('')
    const [hasError, setHasError] = useState(false)
    const theme = useContext(ThemeContext)

    useEffect(() => {
        const searchLocal  = localStorage.getItem('search');
        if(typeof searchLocal === 'string'){
            setSearch(searchLocal);
        }
    }, [])

    useEffect (() => {
        if (hasError) console.log('Error');
        
    }, [hasError])

    const onChangeSearch = (e: {target: HTMLInputElement}) => {
        const searchRes: string = e.target.value;
        search.trim()
        setSearch(searchRes)
    }

    const onClickSearch = () => {
        onUpdateSearch(search);
        localStorage.setItem('search', search)
    }

    const onError = () =>{
       setHasError(true)
    }

    return(
        <div className="search">
            <input className={`search-input ${theme}`} onChange = {onChangeSearch} value={search}></input>
            <button className={`search-btnt ${theme}`} onClick = {onClickSearch}>Search</button>
            <button className={`error-btn ${theme}`} onClick = {onError}>Throw Error</button>
        </div>
    )
}

export default Search;